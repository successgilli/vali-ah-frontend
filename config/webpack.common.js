const path = require('path');
const {
  htmlWebpackPlugin, extractTextPlugin, ExtractTextPlugin, definePlugin, FaviconsWebpackPlugin
} = require('./webpack.plugins.js');

module.exports = {
  entry: ['react-hot-loader/patch', './src/index.jsx'],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    alias: {
      components: path.resolve(__dirname, '../src/components'),
      pages: path.resolve(__dirname, '../src/pages'),
      modules: path.resolve(__dirname, '../src/store/modules'),
      store: path.resolve(__dirname, '../src/store'),
      utils: path.resolve(__dirname, '../src/utils'),
      'react-dom': '@hot-loader/react-dom',
      scss: path.resolve(__dirname, '../src/assets/scss'),
      fixtures: path.resolve(__dirname, '../tests/fixtures'),
      validations: path.resolve(__dirname, '../src/validations'),
      assets: path.resolve(__dirname, '../src/assets')
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      },
      {
        test: /\.s?css$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)|.eot|woff|woff2|ttf$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: 'images/[hash]-[name].[ext]',
              useRelativePath: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    htmlWebpackPlugin,
    extractTextPlugin,
    definePlugin,
    new FaviconsWebpackPlugin(path.resolve(__dirname, '../src/assets/images/1Kb.png'))
  ],
};
