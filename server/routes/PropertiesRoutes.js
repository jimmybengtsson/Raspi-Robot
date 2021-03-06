'use strict';

// Handling all routes for transactions

module.exports = (app) => {

    let hue = require('../controller/Hue');
    let sensor = require('../controller/Sensor');
    let led = require('../controller/Led');
    let verifyWebToken = require('../controller/JWTAuthorization');

    app.route('/properties/temperature/latest')
        .get(verifyWebToken, sensor.getLatestTemperature);

    app.route('/properties/humidity/latest')
        .get(verifyWebToken, sensor.getLatestHumidity);

    app.route('/properties/sensor/search')
        .get(verifyWebToken, sensor.getQueryValues);

    app.route('/properties/sensor/all')
        .get(verifyWebToken, sensor.getAllValues);

    app.route('/properties/hue/latest')
        .get(verifyWebToken, hue.getLatestValues);

    app.route('/properties/hue/search')
        .get(verifyWebToken, hue.getQueryValues);

    app.route('/properties/hue/all')
        .get(verifyWebToken, hue.getAllValues);

    app.route('/properties/hue/state')
        .get(verifyWebToken, hue.getState);

};
