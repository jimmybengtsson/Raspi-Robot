'use strict';

let raspi = require('raspi-io');
let five = require('johnny-five');

let board = new five.Board({
    io: new raspi()
});

// Adding the leds
let ledOne = new five.Led('GPIO20');
let ledTwo = new five.Led('GPIO21');

// Handling all the led actions

exports.ledOn = (req, res) => {

    console.log('Led on');

    board.on('ready', () => {
        ledOne.on();
        ledTwo.on();

        return res.json({message: 'Led on'});
    }).catch((err) => {
        return res.status(500).json({message: err.message})
    });
};

exports.ledOff = (req, res) => {

    console.log('Led off');

    board.on('ready', () => {
        ledOne.off();
        ledTwo.off();

        return res.json({message: 'Led off'});
    }).catch((err) => {
        return res.status(500).json({message: err.message})
    });
};

exports.ledBlink = (req, res) => {

    console.log('Led blink');
    board.on('ready', () => {
        ledOne.strobe(500);
        ledTwo.strobe(500);

        setTimeout(() => {
            ledOne.stop().off();
            ledTwo.stop().off();
        }, 5000);

        return res.json({message: 'Led blinking'});
    }).catch((err) => {
        return res.status(500).json({message: err.message})
    });
};
