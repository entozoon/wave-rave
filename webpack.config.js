const webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  { CleanWebpackPlugin } = require("clean-webpack-plugin"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  path = require("path");
module.exports = (env, argv) => {
  return {
    entry: {
      main: [`${__dirname}/src/main.ts`],
    },
    resolve: {
      modules: [`node_modules`, `src`],
      extensions: [".ts", ".js", ".css"],
    },
    devtool: argv.mode == "production" ? false : "inline-source-map",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      globalObject: "this",
    },
    devServer: {
      contentBase: "./static",
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: `ts-loader`,
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      // new CleanWebpackPlugin([path.resolve(__dirname, "dist")]),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([{ from: "static" }]),
      new HtmlWebpackPlugin({
        template: "static/index.html",
      }),
    ],
    performance: { hints: false },
  };
};
