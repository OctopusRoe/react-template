/*
 * @Author: OctopusRoe
 * @Date: 2023-07-10 11:56:16
 * @LastEditors: OctopusRoe
 * @LastEditTime: 2023-07-10 12:07:41
 * @Description:
 */
const prodConfig = require("./webpack.prod.js");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const { merge } = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = smp.wrap(
  merge(prodConfig, {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerPort: 9091,
        analyzerMode: "static",
      }),
    ],
  })
);
