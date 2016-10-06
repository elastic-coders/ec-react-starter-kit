import path from 'path';
import colors from 'colors/safe';
import url from 'url';

import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import auth from 'http-auth';

import { version } from '../../package.json';
import indexTemplate from './index.html';

const server = express();

server.set('port', (process.env.PORT || 5000));
server.set('trust proxy', true);
server.use(morgan('combined'));
server.use(compression({
  filter: (req, res) => {
    // don't compress responses with Referer request header outside our domain
    const referer = req.get('Referer');
    if (referer) {
      const referrer = url.parse(referer);
      if (referrer.hostname !== req.hostname) {
        return false;
      }
    }

    // fallback to standard filter function
    return compression.filter(req, res);
  },
}));
server.disable('x-powered-by');
server.use((req, res, next) => {
  res.set('X-Frame-Options', 'DENY');
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-XSS-Protection', '1; mode=block');
  res.set('Strict-Transport-Security', 'max-age=7776000');
  next();
});

// Force redirect to HTTPS if needed
if (process.env.FORCE_HTTPS === '1') {
  server.use((req, res, next) => {
    if (!req.secure) {
      res.redirect(301, `https://${req.hostname}${req.url}`);
    } else {
      next();
    }
  });
}

// Http basic auth optional protection
const httpAuthPassword = process.env.BASIC_AUTH_PASSWORD;
if (httpAuthPassword) {
  const httpAuthRealm = process.env.BASIC_AUTH_REALM || 'Private area';
  const basic = auth.basic({
    realm: httpAuthRealm,
    skipUser: true,
    msg401: 'Sorry, this is just for the inner circle to enjoy',
  }, (username, password, callback) => {
    callback(password === httpAuthPassword);
  });
  server.use(auth.connect(basic));
}

server.use(`/${version}`, express.static(path.join(__dirname, './public'), {
  index: false,
}));

server.use(express.static(path.join(__dirname, './static'), {
  index: false,
}));

server.use('*', (req, res) => {
  res.header('Cache-Control', 'no-cache');
  res.send(indexTemplate({
    version,
    configuration: {
      auth0: {
        clientId: process.env.AUTH0_CLIENT_ID,
        domain: process.env.AUTH0_DOMAIN,
      },
    },
  }));
});

server.listen(server.get('port'), () => {
  console.log(colors.green(`🌍  Http server running http://0.0.0.0:${server.get('port')}`)); // eslint-disable-line no-console
  if (process.send) {
    process.send('online');
  }
});
