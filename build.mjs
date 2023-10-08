import * as esbuild from "esbuild";
import {sassPlugin} from 'esbuild-sass-plugin';
import { exec } from 'child_process';

let result = await esbuild.build({
    entryPoints: ["src/main.js"],
    bundle: true,
    minify: true,
    logLevel: 'info',
    color: true,
    outdir: "dist",
    plugins: [sassPlugin()]
});

exec("node .vscode/pack-zip.js", (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);
});