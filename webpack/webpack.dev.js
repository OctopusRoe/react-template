/*
 * @Author: OctopusRoe
 * @Date: 2023-07-10 10:15:52
 * @LastEditors: OctopusRoe
 * @LastEditTime: 2023-07-10 11:54:11
 * @Description:
 */
const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  plugins: [new ReactRefreshWebpackPlugin()],
  devServer: {
    port: 8080,
    compress: false,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "../dist"),
    },
  },
});
