const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv');

Dotenv.config();

dotenv.config();

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
  title: '1kbIdeas',
});

const terserPlugin = new TerserPlugin({
  cache: true,
  parallel: true,
  sourceMap: true
});

const optimizeCSSAssetsPlugin = new OptimizeCSSAssetsPlugin({});

const cleanWebpackPlugin = new CleanWebpackPlugin();

const extractTextPlugin = new ExtractTextPlugin('bundle.min.css');

const definePlugin = new webpack.DefinePlugin({
  'process.env': JSON.stringify(process.env),
});

module.exports = {
  htmlWebpackPlugin,
  terserPlugin,
  optimizeCSSAssetsPlugin,
  cleanWebpackPlugin,
  extractTextPlugin,
  ExtractTextPlugin,
  definePlugin
};
