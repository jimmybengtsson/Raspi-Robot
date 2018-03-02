'use strict';

let led = require('../controller/Led');

// Handling all routes for actions

module.exports = (app) => {

    app.route('/actions/led/on')
        .get(led.ledOn);

    app.route('/actions/led/off')
        .get(led.ledOff);

    app.route('/actions/led/blink')
        .get(led.ledBlink);


};