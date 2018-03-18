'use strict';

let led = require('../controller/Led');
let cameraServo = require('../controller/CameraServo');
let motor = require('../controller/Motor');
let camera = require('../controller/Camera');
let hue = require('../controller/Hue');

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

    app.route('/actions/motor/forward')
        .get(motor.forward);

    app.route('/actions/motor/reverse')
        .get(motor.reverse);

    app.route('/actions/motor/stop')
        .get(motor.stop);

    app.route('/actions/motor/left')
        .get(motor.left);

    app.route('/actions/motor/right')
        .get(motor.right);

    app.route('/actions/hue/on')
        .get(hue.lightOn);

    app.route('/actions/hue/off')
        .get(hue.lightOff);

    app.route('/actions/hue/blink')
        .get(hue.notifications);


};