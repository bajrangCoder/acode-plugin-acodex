import * as esbuild from "esbuild";
import { sassPlugin } from 'esbuild-sass-plugin';
import { exec } from 'child_process';

const isServe = process.argv.includes("--serve");

let buildConfig = {
  entryPoints: ["src/main.js"],
  bundle: true,
  minify: true,
  logLevel: 'info',
  color: true,
  outdir: "dist",
  plugins: [sassPlugin()]
};

// to pack the zip file
function packZip() {
  exec("node .vscode/pack-zip.js", (err, stdout, stderr) => {
    if (err) {
      console.error("Error packing zip:", err);
      return;
    }
    console.log("Packed zip:", stdout);
  });
}

if (!isServe) {
  // Production build
  let result = await esbuild.build(buildConfig);

  // Pack zip after building
  packZip();

} else {
  // Serve mode with watch and zip packing on rebuild
  let ctx = await esbuild.context(buildConfig);

  await ctx.watch();
  let { host, port } = await ctx.serve({
    servedir: "dist",
    onRequest: async (args) => {
      packZip();
    }
  });
}
