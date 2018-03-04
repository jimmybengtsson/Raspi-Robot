'use strict';

let raspi = require('raspi-io');
let five = require('johnny-five');

let horisontalServo;

let board = new five.Board({
    io: new raspi()
});

exports.initialize = () => {

    board.on('ready', () => {
        console.log('Board is ready');

        horisontalServo = new five.Servo('GPIO19');

        horisontalServo.sweep();
        setTimeout(() => {
            horisontalServo.stop();
        }, 3000);
        setTimeout(() => {
            horisontalServo.center();
        }, 3200);
    });
};

exports.left = (req, res) => {

    horisontalServo.min();
    return res.json({
        message: 'Camera left'
    });

};

exports.right = (req, res) => {

    horisontalServo.max();
    return res.json({
        message: 'Camera right'
    });

};

exports.center = (req, res) => {

    horisontalServo.center();
    return res.json({
        message: 'Camera center'
    });

};