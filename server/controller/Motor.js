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


