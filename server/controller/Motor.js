'use strict';

let raspi = require('raspi-io');
let five = require('johnny-five');

let motorLeft;
let motorRight;

exports.initialize = (board) => {

    board.on('ready', () => {
        console.log('Motor board is ready');

        motorLeft = new five.Motor({
            pins: {pwm: 23, dir: 22},
        });
        motorRight = new five.Motor({
            pins: {pwm: 1, dir: 4},
        });

        setTimeout(() => {
            motorLeft.forward(255);
            motorRight.forward(255);
        }, 5500);

        setTimeout(() => {
            motorLeft.stop();
            motorRight.stop();
            console.log('Motor stop');
        }, 7500);

        setTimeout(() => {
            motorLeft.reverse(255);
            motorRight.reverse(255);
        }, 7700);

        setTimeout(() => {
            motorLeft.stop();
            motorRight.stop();
            console.log('Motor stop');
        }, 9700);

        setTimeout(() => {
            motorLeft.forward(255);
            motorRight.reverse(255);
        }, 10000);

        setTimeout(() => {
            motorLeft.stop();
            motorRight.stop();
            console.log('Motor stop');
        }, 12000);

        setTimeout(() => {
            motorLeft.reverse(255);
            motorRight.forward(255);
        }, 12200);

        setTimeout(() => {
            motorLeft.stop();
            motorRight.stop();
            console.log('Motor stop');
        }, 14200);

    });
};

exports.left = (req, res) => {

    motorLeft.reverse(255);
    motorRight.forward(255);
    return res.json({
        message: 'Motor left'
    });

};

exports.right = (req, res) => {

    motorLeft.forward(255);
    motorRight.reverse(255);
    return res.json({
        message: 'Motor right'
    });

};

exports.forward = (req, res) => {

    motorLeft.forward(255);
    motorRight.forward(255);
    return res.json({
        message: 'Motor forward'
    });

};

exports.reverse = (req, res) => {

    motorLeft.reverse(255);
    motorRight.reverse(255);
    return res.json({
        message: 'Motor reverse'
    });

};

exports.stop = (req, res) => {

    motorLeft.stop();
    motorRight.stop();
    return res.json({
        message: 'Motor stop',
    });
};


