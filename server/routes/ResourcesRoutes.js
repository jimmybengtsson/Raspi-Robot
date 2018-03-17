'use strict';

// Handling all routes for transactions

module.exports = (app) => {

    let hue = require('../controller/Hue');
    let sensor = require('../controller/Sensor');
    let verifyWebToken = require('../controllers/JWTAuthorization');

    app.route('/resource/dht/latest')
        .get(sensor);

    app.route('/resource/dht/search')
        .get(sensor);

    app.route('/resource/hue/latest')
        .get(hue);

    app.route('/resource/hue/search')
        .get(hue);

};
