/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const defaultConfig = require('../webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Required for babel-preset-react-app
process.env.NODE_ENV = 'development';

module.exports = merge(defaultConfig, {
  mode: 'development',
  devServer: {
    compress: true,
    https: true,
    hot: true,
    host: 'local-lore.dubaua.ru', // add it to your hosts and redirect to 127.0.0.1
    open: true,
    port: 8000,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
  },
  devtool: 'eval-cheap-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
