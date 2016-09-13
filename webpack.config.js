const path = require('path');
const webpack = require('webpack');

const src = path.join(__dirname, './src');
const dist = path.join(__dirname, './dist');
const distPublic = path.join(__dirname, './dist/public');

const vendorsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendors',
  filename: 'vendors.js',
  minChunks: (m) => {
    if (typeof m.userRequest !== 'string') {
      return false;
    }
    return m.userRequest.indexOf(/node_modules/) >= 0;
  },
});

const client = {
  entry: [
    'webpack-dev-server/client?http://localhost:9000',
    'webpack/hot/only-dev-server',
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
    publicPath: '/public/'
  },
  vendorsChunkPlugin,
  plugins: [
    vendorsChunkPlugin,
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [src],
        loaders: ['react-hot', 'babel'],
      },
      {
        test: /\.css$/, // Might need to exclude bootstrap
        include: [src],
        loader: 'style-loader!css-loader?modules&importLoaders=1&sourceMap&localIdentName=[name]--[local]--[hash:base64:5]!postcss-loader',
      }
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
