'use strict';

let raspi = require('raspi-io');
let five = require('johnny-five');

let getHateOasLinks = require('../model/HateOas').getHateOasLinks;

let horisontalServo;

exports.initialize = (board) => {

    board.on('ready', () => {
        console.log('Cameraservo is ready');

        horisontalServo = new five.Servo({
            pin: 'GPIO25',
            range: [35, 145]
        });

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

    let message = 'Camera left';

    getHateOasLinks(message, 'action', 'actionCameraLeft').then((response) => {

        return res.json(response);
    }).catch((err) => {
        throw new Error(err);
    });

};

exports.right = (req, res) => {

    horisontalServo.max();

    let message = 'Camera right';

    getHateOasLinks(message, 'action', 'actionCameraRight').then((response) => {

        return res.json(response);
    }).catch((err) => {
        throw new Error(err);
    });

};

exports.center = (req, res) => {

    horisontalServo.center();

    let message = 'Camera center';

    getHateOasLinks(message, 'action', 'actionCameraCenter').then((response) => {

        return res.json(response);
    }).catch((err) => {
        throw new Error(err);
    });

};