/* eslint-env node */
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    // 其他插件
  ],
};

module.exports = webpackConfig