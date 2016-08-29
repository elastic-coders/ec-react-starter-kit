import fse from 'fs-extra-promise';
import path from 'path';
import colors from 'colors/safe';

export default async (args = {}) => {
  console.log(colors.yellow('Copy...'));

  if (args.help) {
    console.log('  Copy package json in dist directory.');
    return;
  }

  // Copy static fils
  await fse.copyAsync(
    path.join(__dirname, '../src/static'),
    path.join(__dirname, '../dist/static')
  );

  // Copy package json
  const pkg = await fse.readJsonAsync(path.join(__dirname, '../package.json'));
  pkg.scripts = {
    start: 'node ./server',
  };
  pkg.main = 'main.js';
  await fse.writeJsonAsync(path.join(__dirname, '../dist/package.json'), pkg);
};
