'use strict';

let raspi = require('raspi-io');
let five = require('johnny-five');

let getHateOasLinks = require('../model/HateOas').getHateOasLinks;

let leds;

// Handling all the led actions

exports.ledOn = (req, res) => {

        leds.on((err) => {
            if (err) {
                return res.status(500).json({ message: 'Server failed. Please try again!', });
            }

        });
    let message = 'Led on';

    getHateOasLinks(message, 'action', 'actionLedOn').then((response) => {

        return res.json(response);
    }).catch((err) => {
        throw new Error(err);
    });
};

exports.ledOff = (req, res) => {

    leds.off((err) => {
        if (err) {
            return err;
        }
    });
    let message = 'Led off';

    getHateOasLinks(message, 'action', 'actionLedOff').then((response) => {

        return res.json(response);
    }).catch((err) => {
        throw new Error(err);
    });

};

exports.ledBlink = (req, res) => {

    console.log('Led blink');

    blink();

    let message = 'Led flash';

    getHateOasLinks(message, 'action', 'actionLedBlink').then((response) => {

        return res.json(response);
    }).catch((err) => {
        throw new Error(err);
    });

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