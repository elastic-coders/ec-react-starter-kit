const path = require('path');
const webpack = require('webpack');

const src = path.join(__dirname, './src');
const dist = path.join(__dirname, './dist');
const distPublic = path.join(__dirname, './dist/public');

const client = {
  entry: [
    'webpack-dev-server/client?http://localhost:9000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    'babel-polyfill',
    './src/client/client',
  ],
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
  },
  output: {
    path: distPublic,
    filename: 'client.js',
    publicPath: '/public/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.js',
      minChunks: (m) => {
        if (typeof m.userRequest !== 'string') {
          return false;
        }
        return m.userRequest.indexOf(/node_modules/) >= 0;
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        include: [src],
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[name]--[local]--[hash:base64:5]',
          'postcss',
        ],
      },
      {
        test: /\.js$/,
        include: [src],
        loaders: ['babel'],
      },
    ],
  },
  postcss: [
    require('precss')({}),
    require('autoprefixer')({}),
    require('cssnano')({}),
  ],
};

const server = {
  entry: [
    'babel-polyfill',
    './src/server/server',
  ],

  devtool: 'cheap-eval-source-map',
  cache: true,
  debug: true,

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
  },
  output: {
    path: dist,
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  externals: [
    // All files not starting with `./` are considered external and will not
    // be bundled in the server script (node_modules installation required)
    (context, request, cb) => {
      const isExternal = request.match(/^[a-z][a-z\/\.\-0-9]*$/i);
      cb(null, Boolean(isExternal));
    },
  ],
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },

  plugins: [
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: src,
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
};

module.exports = [client, server];
