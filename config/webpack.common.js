const path = require('path');
const { htmlWebpackPlugin } = require('./webpack.plugins.js');

module.exports = {
  entry: ['react-hot-loader/patch', './src/index.jsx'],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, '../src/components'),
      pages: path.resolve(__dirname, '../src/pages'),
      modules: path.resolve(__dirname, '../src/store/modules'),
      utils: path.resolve(__dirname, '../src/utils'),
      'react-dom': '@hot-loader/react-dom',
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        loader: 'file-loader',
      }
    ]
  },
  plugins: [
    htmlWebpackPlugin
  ],
};
