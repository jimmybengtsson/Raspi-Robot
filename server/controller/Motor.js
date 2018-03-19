'use strict';

let raspi = require('raspi-io');
let five = require('johnny-five');

let getHateOasLinks = require('../model/HateOas').getHateOasLinks;

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

    let message = 'Motor left';

    getHateOasLinks(message, 'action', 'actionMotorLeft').then((response) => {

        return res.json(response);
    }).catch((err) => {
        throw new Error(err);
    });

};

exports.right = (req, res) => {

    motorLeft.forward(255);
    motorRight.reverse(255);

    let message = 'Motor right';

    getHateOasLinks(message, 'action', 'actionMotorRight').then((response) => {

        return res.json(response);
    }).catch((err) => {
        throw new Error(err);
    });

};

exports.forward = (req, res) => {

    motorLeft.forward(255);
    motorRight.forward(255);

    let message = 'Motor forward';

    getHateOasLinks(message, 'action', 'actionMotorForward').then((response) => {

        return res.json(response);
    }).catch((err) => {
        throw new Error(err);
    });

};

exports.reverse = (req, res) => {

    motorLeft.reverse(255);
    motorRight.reverse(255);

    let message = 'Motor reverse';

    getHateOasLinks(message, 'action', 'actionMotorReverse').then((response) => {

        return res.json(response);
    }).catch((err) => {
        throw new Error(err);
    });

};

exports.stop = (req, res) => {

    motorLeft.stop();
    motorRight.stop();

    let message = 'Motor stop';

    getHateOasLinks(message, 'action', 'actionMotorStop').then((response) => {

        return res.json(response);
    }).catch((err) => {
        throw new Error(err);
    });
};


