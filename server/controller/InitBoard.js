'use strict';

let raspi = require('raspi-io');
let five = require('johnny-five');

let led = require('./Led');
let cameraServo = require('./CameraServo');
let motor = require('./Motor');

let board = new five.Board({
    io: new raspi({
        enableSoftPwm: true,
    }),
});

exports.initialize = () => {

    board.on('connect', () => {

        console.log('Board is ready');

        motor.initialize(board);
        cameraServo.initialize(board);
        led.initialize(board);
    });
};