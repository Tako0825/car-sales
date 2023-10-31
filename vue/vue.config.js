const { defineConfig } = require('@vue/cli-service') 
const { webpackConfig } = require('./webpack.config') 

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: webpackConfig
})