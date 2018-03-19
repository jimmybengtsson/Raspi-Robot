'use strict';

let led = require('../controller/Led');
let cameraServo = require('../controller/CameraServo');
let motor = require('../controller/Motor');
let camera = require('../controller/Camera');
let hue = require('../controller/Hue');

// Handling all routes for actions

module.exports = (app) => {

    let verifyWebToken = require('../controller/JWTAuthorization');

    app.route('/actions/led/on')
        .get(verifyWebToken, led.ledOn);

    app.route('/actions/led/off')
        .get(verifyWebToken, led.ledOff);

    app.route('/actions/led/blink')
        .get(verifyWebToken, led.ledBlink);

    app.route('/actions/camera/left')
        .get(verifyWebToken, cameraServo.left);

    app.route('/actions/camera/right')
        .get(verifyWebToken, cameraServo.right);

    app.route('/actions/camera/center')
        .get(verifyWebToken, cameraServo.center);

    app.route('/actions/motor/forward')
        .get(verifyWebToken, motor.forward);

    app.route('/actions/motor/reverse')
        .get(verifyWebToken, motor.reverse);

    app.route('/actions/motor/stop')
        .get(verifyWebToken, motor.stop);

    app.route('/actions/motor/left')
        .get(verifyWebToken, motor.left);

    app.route('/actions/motor/right')
        .get(verifyWebToken, motor.right);

    app.route('/actions/hue/on')
        .get(verifyWebToken, hue.lightOn);

    app.route('/actions/hue/off')
        .get(verifyWebToken, hue.lightOff);

    app.route('/actions/hue/blink')
        .get(verifyWebToken, hue.notifications);


};