const webpack = require('webpack');
const path = require('path');
const baseConfig = require('./webpack.config.js');

const src = path.join(__dirname, './src');

const client = Object.assign({}, baseConfig[0], {
  entry: [
    'babel-polyfill',
    './src/client/client',
  ],
  devtool: 'cheap-module-source-map',
  plugins: baseConfig[0].plugins.slice(1).concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      comments: false,
      sourceMap: false,
      compress: { warnings: false },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ]),
  module: {
    loaders: baseConfig[0].module.loaders.slice(1).concat([
      {
        test: /\.css$/,
        include: [src],
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]--[local]--[hash:base64:5]',
          'postcss',
        ],
      },
    ]),
  },
});

const server = Object.assign({}, baseConfig[1], {
  devtool: 'cheap-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true,
      },
    }),
  ],
});

module.exports = [client, server];
