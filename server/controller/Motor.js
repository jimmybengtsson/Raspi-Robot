'use strict';

let raspi = require('raspi-io');
let five = require('johnny-five');

let motorLeft;
let motorRight;

let board = new five.Board({
    io: new raspi()
});

exports.initialize = () => {

    board.on('ready', () => {
        console.log('Motor board is ready');

        motorLeft = new five.Motor({
            pins: {pwm: 23, dir: 22},
        });
        motorRight = new five.Motor({
            pins: {pwm: 1, dir: 4},
        });

        motorLeft.forward(255);
        motorRight.forward(255);

        setTimeout(() => {
            motorLeft.stop();
            motorRight.stop();
            console.log('Motor stop');
        }, 2000);


    });
};
