const webpack = require('webpack');
const CleanWebPackPlugin = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const process = require('process');
const path = require('path');

const pathsToClean = ['build']
const cleanOptions = {
  root: __dirname,
  exclude: [],
  verbose: true,
  dry: false
}

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PUBLIC_PATH='/assets/';
const OUTPUT_DIRECTORY = __dirname + `/public/${PUBLIC_PATH}`;

const BABEL_PRESET = {
  loader: 'babel-loader',
  options: {
    presets: ['es2015']
  }
};

module.exports = {
    entry: {
      app: "./app/client/app.js",
      style: "./app/stylesheets/style.scss"
    },
    output: {
        path: OUTPUT_DIRECTORY,
        filename: `[name].js`,
        publicPath: PUBLIC_PATH,
    },
    devServer: {
      contentBase: './public',
      hot: true
    },
    module: {
      rules: [
        { test: /\.jsx?$/, exclude: /node_modules/, use: BABEL_PRESET },
        { test: /\.jsx?$/, include: /node_modules\/quintype-toddy-libs/, use: BABEL_PRESET },
        { test: /\.(sass|scss)$/, loader: ExtractTextPlugin.extract('css-loader!sass-loader') },
        {
          test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
          loader: "file-loader",
          query: {
            context: './app/assets',
            name: "[name].[ext]"
          }
        }
      ]
    },
    plugins: [
      new CleanWebPackPlugin(pathsToClean, cleanOptions),
      new HtmlWebPackPlugin({
      filename: "./index.html",
      template: "./views/home/index.ejs",
      hash: true,
      index: true,
      minify: true
      }),
      new ExtractTextPlugin({ filename: '[name].css', allChunks: true })]
};
