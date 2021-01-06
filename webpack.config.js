const path = require("path");
const pathToPhaser = path.join(__dirname, "/node_modules/phaser/");
const phaser = path.join(pathToPhaser, "dist/phaser.js");

module.exports = {
  entry: "./src/game.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /phaser\.js$/,
        exclude: /node_modules/,
        loader: "expose-loader",
        options: { exposes: { globalName: "Phaser", override: true } },
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./"),
    publicPath: "/dist/",
    host: "127.0.0.1",
    port: 8080,
    open: true,
    compress: true,
    hot: true,
  },
  resolve: {
    extensions: [".ts"],
    alias: {
      phaser: phaser,
    },
  },
};
