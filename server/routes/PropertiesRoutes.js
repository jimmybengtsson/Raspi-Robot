'use strict';

// Handling all routes for transactions

module.exports = (app) => {

    let hue = require('../controller/Hue');
    let sensor = require('../controller/Sensor');
    let led = require('../controller/Led');
    let verifyWebToken = require('../controller/JWTAuthorization');

    app.route('/properties/temperature/latest')
        .get(sensor.getLatestTemperature);

    app.route('/properties/humidity/latest')
        .get(sensor.getLatestHumidity);

    app.route('/properties/sensor/search')
        .get(sensor.getQueryValues);

    app.route('/properties/dht/all')
        .get(sensor.getAllValues);

    app.route('/properties/hue/latest')
        .get(hue.getLatestValues);

    app.route('/properties/hue/search')
        .get(hue.getQueryValues);

    app.route('/properties/hue/all')
        .get(hue.getAllValues);

    app.route('/properties/hue/state')
        .get(hue.getState);

};
