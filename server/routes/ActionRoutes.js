'use strict';

let led = require('../controller/Led');
let cameraServo = require('../controller/CameraServo');

// Handling all routes for actions

module.exports = (app) => {

    app.route('/actions/led/on')
        .get(led.ledOn);

    app.route('/actions/led/off')
        .get(led.ledOff);

    app.route('/actions/led/blink')
        .get(led.ledBlink);

    app.route('/actions/camera/left')
        .get(cameraServo.left);

    app.route('/actions/camera/right')
        .get(cameraServo.right);

    app.route('/actions/camera/center')
        .get(cameraServo.center);


};