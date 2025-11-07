/* eslint-env node */
const { defineConfig } = require("@vue/cli-service");
const { webpackConfig } = require("./webpack.config");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: webpackConfig,
  // productionSourceMap: true // 关闭生产环境的代码压缩和混淆
});
