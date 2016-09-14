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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    baseConfig[0].vendorsChunkPlugin,
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      comments: false,
      sourceMap: false,
      compress: { warnings: false },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [src],
        loader: 'babel',
      },
      {
        test: /\.css$/, // Might need to exclude bootstrap
        include: [src],
        loader: 'style-loader!css-loader?modules&importLoaders=1&minimize!postcss-loader',
      }
    ],
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
