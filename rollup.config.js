import alias from "@rollup/plugin-alias";
// import commonjs from "rollup-plugin-commonjs";
import commonjs from "@rollup/plugin-commonjs";
import path from "path";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import staticFiles from "rollup-plugin-static-files";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

const isProd = process.env.NODE_ENV === "production";

const config = {
  //  Our games entry point (edit as required)
  input: "src/game.ts",

  //  Where the build file is to be generated.
  //  Most games being built for distribution can use iife as the module type.
  output: {
    dir: "docs",
    entryFileNames: "index.js",
    name: "Phaser",
    format: "iife",
    sourcemap: false,
    intro: "var global = window",
  },

  plugins: [
    //  Toggle the booleans here to enable / disable Phaser 3 features:
    replace({
      "typeof CANVAS_RENDERER": "'true'",
      "typeof WEBGL_RENDERER": "'true'",
      "typeof EXPERIMENTAL": "'true'",
      "typeof PLUGIN_CAMERA3D": "'false'",
      "typeof PLUGIN_FBINSTANT": "'false'",
      "typeof FEATURE_SOUND": "'true'",
      "process.env.NODE_ENV": isProd ? "'production'" : "'development'",
    }),

    //  See https://www.npmjs.com/package/rollup-plugin-typescript2 for config options
    typescript({
      // mykemod - this is my touch of genius, because it allows out
      // tsconfig.json to say commonjs, which let's vscode intellisense work
      // but override it within here to be es2015 so rollup can work
      tsconfigOverride: { compilerOptions: { module: "es2015" } },
    }),
  ],
};

if (isProd) {
  config.plugins = [
    ...config.plugins,
    // Parse our .ts source files
    resolve({
      extensions: [".ts"],
    }),
    // We need to convert the Phaser 3 CJS modules into a format Rollup can use:
    commonjs({
      include: ["node_modules/eventemitter3/**", "node_modules/phaser/**"],
      exclude: ["node_modules/phaser/src/polyfills/requestAnimationFrame.js"],
      sourceMap: isProd,
      ignoreGlobal: true,
    }),
    staticFiles({
      include: ["./public"],
    }),
    //  See https://www.npmjs.com/package/rollup-plugin-uglify for config options
    terser({
      mangle: false,
      compress: {
        global_defs: {
          module: false,
        },
      },
    }),
  ];
} else {
  // nollup hack
  const hotReload = () => ({
    renderChunk: (code) => {
      const defaultExport = /(var Phaser)([\S+\n\r\s]{0,100})(Phaser = _([A-Za-z0-9]*)\(\))(\.default)/g;
      code = code.replace(defaultExport, "var ex_$4$2ex_$4 = _$4()");
      return code.replace(
        "modules[number](function (dep) {\n",
        "module.hot.accept(() => {window.location.reload();})\n\nmodules[number](function (dep) {\n"
      );
    },
  });
  config.plugins = [
    ...config.plugins,
    alias({
      entries: [
        {
          find: "phaser",
          replacement: path.resolve(
            __dirname,
            "node_modules/phaser/dist/phaser.js"
          ),
        },
      ],
    }),
    hotReload(),
  ];
}

export default config;
