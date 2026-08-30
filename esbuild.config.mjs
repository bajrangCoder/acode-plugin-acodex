import * as esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import { exec } from "node:child_process";
import { cpSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";

function syncTerminalAssets() {
  mkdirSync("dist", { recursive: true });
  cpSync("node_modules/@xterm/xterm/css/xterm.css", "dist/xterm.css");
  rmSync("dist/librio_wasm_bg.wasm", { force: true });
}

const isServe = process.argv.includes("--serve");

// Function to pack the ZIP file
function packZip() {
  exec("bun .vscode/pack-zip.js", (err, stdout, stderr) => {
    if (err) {
      console.error("Error packing zip:", err);
      return;
    }
    console.log(stdout.trim());
  });
}

// Custom plugin to pack ZIP after build or rebuild
const zipPlugin = {
  name: "zip-plugin",
  setup(build) {
    build.onStart(() => {
      syncTerminalAssets();
    });

    build.onEnd(() => {
      packZip();
    });
  },
};

const rioCompatPlugin = {
  name: "rio-compat",
  setup(build) {
    build.onResolve({ filter: /^rioterm-wasm$/ }, () => ({
      path: resolve("node_modules/rioterm/wasm/librio_wasm_bg.wasm"),
    }));

    build.onLoad({ filter: /node_modules[\\/]rioterm[\\/]dist[\\/]index\.js$/ }, (args) => {
      let source = readFileSync(args.path, "utf8");
      const opaqueContext = 'this.canvas.getContext("2d", { alpha: false })';
      const transparentContext = 'this.canvas.getContext("2d", { alpha: true })';
      const rowStart = `    const ctx = this.ctx;
    const y = row * ch;
    const base = row * snap.cols * CELL_WORDS;`;
      const transparentRowStart = `    const ctx = this.ctx;
    const y = row * ch;
    ctx.clearRect(0, y, snap.cols * cw, ch);
    const base = row * snap.cols * CELL_WORDS;`;

      if (!source.includes(opaqueContext) || !source.includes(rowStart)) {
        throw new Error("RioTerm canvas internals changed; update the transparency patch.");
      }
      source = source
        .replace(opaqueContext, transparentContext)
        .replace(rowStart, transparentRowStart);

      return {
        contents: source,
        loader: "js",
        resolveDir: dirname(args.path),
      };
    });
  },
};

// Base build configuration
const buildConfig = {
  entryPoints: ["src/main.js"],
  bundle: true,
  minify: true,
  logLevel: "info",
  color: true,
  outdir: "dist",
  loader: {
    ".wasm": "binary",
  },
  plugins: [rioCompatPlugin, zipPlugin, sassPlugin()],
};

// Main function to handle both serve and production builds
(async () => {
  if (isServe) {
    console.log("Starting development server...");

    // Watch and Serve Mode
    const ctx = await esbuild.context(buildConfig);

    await ctx.watch();
    const { host, port } = await ctx.serve({
      servedir: ".",
      port: 3000,
    });
  } else {
    console.log("Building for production...");
    await esbuild.build(buildConfig);
    console.log("Production build complete.");
  }
})();
