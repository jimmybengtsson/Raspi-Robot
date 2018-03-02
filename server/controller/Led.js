'use strict';

let raspi = require('raspi-io');
let five = require('johnny-five');

let leds;

let board = new five.Board({
    io: new raspi()
});

board.on('connect', () => {
    console.log('Board is ready');
    leds = new five.Leds(['GPIO20', 'GPIO21']);
});

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
        leds.strobe(500);

        setTimeout(() => {
            console.log('Led blink stop');
            leds.stop().off();
        }, 5000);

        return res.json({message: 'Led blinking'});

};

exports.ledBlinkTest = (req, res) => {

    console.log('Led blink test');
    board.on('ready', () => {

        let led = new five.Leds(['GPIO20', 'GPIO21']);
        led.strobe(500);

        setTimeout(() => {
            console.log('Led blink stop');
            led.stop().off();
        }, 5000);
    });

};
