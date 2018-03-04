'use strict';

let RaspiSensors = require('raspi-sensors');
let mongoose = require('mongoose');
let SensorModel = mongoose.model('Sensors');

let DHT21 = new RaspiSensors.Sensor({
    type: 'DHT22',
    pin: 0X7

});

exports.readInterval = () => {

    return DHT21.fetchInterval((err, data) => {
        if (err) {
            console.error("Error when reading DHT21-values!");
            console.error(err.message);
            return;
        }
        if (data.value === 0) {
            console.log('DHT-value skipped because of zero');
            return;
        }

        let newSensors = new SensorModel(data);

        newSensors.save((err, value) => {

            if (err) {
                throw new Error(err);
            }

            console.log('Saved to sensors db: ' + value);

            return value;
        });
    }, 300);
};