import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
const [clientConfig] = require('../webpack.config.js');
const bundler = webpack(clientConfig);

export default async (args) => {
  const watchArgs = Object.assign({ watch: true }, args);
  await require('./build')(watchArgs);
  await require('./serve')(watchArgs);

  if (args.help) {
    return;
  }

  const server = new webpackDevServer(bundler, {
    hot: true,
    // Enable special support for Hot Module Replacement
    // Page is no longer updated, but a 'webpackHotUpdate' message is send to the content
    // Use 'webpack/hot/dev-server' as additional module in your entry point
    // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: true,

    // Set this if you want to enable gzip compression for assets
    compress: false,

    // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
    // Use '*' to proxy all paths to the specified server.
    // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
    // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 )
    proxy: {
      '**': 'http://localhost:5000',
    },

    // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
    staticOptions: {
    },

    // webpack-dev-middleware options
    quiet: false,
    noInfo: false,
    // lazy: true,
    // filename: 'app.js',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    publicPath: '/public/',
    stats: {
      colors: true,
      chunks: false,
      children: true,
    },
  });

  server.listen(9000, 'localhost', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('Listening webpack dev server at http://localhost:9000');
  });
};
