import colors from 'colors/safe';
import path from 'path';
import cp from 'child_process';
import watchFile from './lib/watch';

export default (args) => new Promise((resolve, reject) => {
  console.log(colors.yellow('Serve...'));

  const { watch } = Object.assign(
    {
      watch: false,
    },
    args
  );

  if (args.help) {
    console.log('  Start the server. Options:');
    console.log(`  ${colors.gray('watch')}: Restart the server on changes (${watch})`);
    return resolve();
  }

  function start() {
    const server = cp.fork(path.join(__dirname, '../dist/server.js'), {
      env: Object.assign({ NODE_ENV: 'development' }, process.env),
      silent: false,
    });

    server.once('message', message => {
      if (message.match(/^online$/)) {
        resolve();
      }
    });
    server.once('error', err => reject(err));
    process.on('exit', () => server.kill('SIGTERM'));
    return server;
  }

  let server = start();

  if (watch) {
    watchFile('./dist/server.js').then(watcher => {
      watcher.on('changed', () => {
        server.kill('SIGTERM');
        server = start();
      });
    });
  }
});
