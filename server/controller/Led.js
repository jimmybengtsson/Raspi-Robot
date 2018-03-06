'use strict';

let raspi = require('raspi-io');
let five = require('johnny-five');

let leds;

// Handling all the led actions

exports.ledOn = (req, res) => {

        leds.on((err) => {
            if (err) {
                return res.status(500).json({ message: 'Server failed. Please try again!', });
            }

        });
    return res.json({
        message: 'Led on'
    });
};

exports.ledOff = (req, res) => {

    leds.off((err) => {
        if (err) {
            return err;
        }
    });
    return res.json({
        message: 'Led off'
    });

};

exports.ledBlink = (req, res) => {

    console.log('Led blink');

    blink();

    return res.json({message: 'Led blinking'});

};

exports.initialize = (board) => {

    board.on('ready', () => {

        console.log('Led blink initialize');

        leds = new five.Leds(['GPIO20', 'GPIO21']);
        blink();

        setTimeout(() => {
           leds.on();
        }, 5500);

        setTimeout(() => {
            leds.off();
        }, 15000);
    });

};

let blink = () => {

        leds.strobe(500);

        setTimeout(() => {
            console.log('Led blink stop');
            leds.stop().off();
        }, 5000);
};