'use strict';

let jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    let webToken = req.headers['x-access-token'];

    if (!webToken) {
      return res.status(403).json({ auth: false, message: 'Authorization failed. No token.' });
    }

    // Verify token in request
    jwt.verify(webToken, process.env.WEB_TOKEN_SECRET, (err, data) => {

        if (err) {
          return res.status(401).json({ auth: false, message: 'Authentication failed. Token denied' });
        }

        req.userId = data.id;
        next();
      });
  };
