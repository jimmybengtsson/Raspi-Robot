'use strict';

// Handling all routes for transactions

module.exports = (app) => {

    let hue = require('../controller/Hue');
    let sensor = require('../controller/Sensor');
    let verifyWebToken = require('../controller/JWTAuthorization');

    app.route('/resource/temperature/latest')
        .get(sensor.getLatestTemperature);

    app.route('/resource/temperature/latest')
        .get(sensor.getLatestHumidity);

    app.route('/resource/dht/search')
        .get(sensor.getQueryValues);

    app.route('/resource/dht/all')
        .get(sensor.getAllValues);

    app.route('/resource/hue/latest')
        .get(hue.getLatestValues);

    app.route('/resource/hue/search')
        .get(hue.getQueryValues);

};
