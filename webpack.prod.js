const path = require("path");
const { merge } = require("webpack-merge");
const config = require("./webpack.config");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(
  {
    mode: "production",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].js",
    },
    plugins: [new CleanWebpackPlugin()],
  },
  config
);
