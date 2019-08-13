"use strict"
const path = require("path")

module.exports = {
  dev: {
    assetsSubDirectory: "static",
    assetsPublicPath: "./",
    proxyTable: {
      "/": {
        // target: 'http://172.30.1.160:8091',
        target: "http://47.104.241.186/huxi/",
        changeOrigin: true
      }
    },
    host: "localhost",
    port: 9797, 
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    useEslint: true,
    devtool: "cheap-module-eval-source-map",
    cacheBusting: true,
    cssSourceMap: true
  },
  build: {
    index: path.resolve(__dirname, "../dist/index.html"),
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    productionSourceMap: true,
    devtool: "#source-map",
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
