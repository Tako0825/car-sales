/* eslint-env node */
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require('compression-webpack-plugin')

const webpackConfig = {
  mode: "development",
  resolve: {
    alias: {
      "@": resolve(__dirname, "src/"),
    },
  },
  // 使用 MiniCssExtractPlugin 插件来提取 CSS 文件
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          // ... 其他 loader
        ],
        include: [resolve(__dirname, "src/")], // 根据你的项目结构调整
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/chunk-vendors.[contenthash].css", // 使用 contenthash 提高缓存命中率
    }),
    new CompressionPlugin({
      algorithm: 'gzip', // 指定压缩算法
      test: /\.(css|js|html|svg)$/, // 匹配需要压缩的文件类型
      threshold: 8192, // 文件大小超过 8KB 才压缩（可选）
      minRatio: 0 // 压缩率小于 0.8 才保留（可选）
    })
  ],
  productionGzip: true
};

module.exports = webpackConfig