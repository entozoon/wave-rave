const webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  { CleanWebpackPlugin } = require("clean-webpack-plugin"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  path = require("path");
module.exports = (env, argv) => {
  return {
    entry: {
      main: [`${__dirname}/src/main.ts`, `${__dirname}/src/app.scss`],
    },
    resolve: {
      modules: [`node_modules`, `src`],
      extensions: [".ts", ".js", ".scss"],
    },
    devtool: "inline-source-map",
    watch: true,
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js",
      globalObject: "this",
    },
    devServer: {
      contentBase: "./build",
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          // use: extractCss.extract({
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.ts$/,
          use: `ts-loader`,
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      // new CleanWebpackPlugin([path.resolve(__dirname, "build")]),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([{ from: "static" }]),
      new HtmlWebpackPlugin({
        template: "static/index.html",
      }),
    ],
    performance: { hints: false },
  };
};
