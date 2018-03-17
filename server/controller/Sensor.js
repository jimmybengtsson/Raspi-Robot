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
    }, 60);
};

exports.getLatestTemperature = (req, res) => {

    SensorModel.findOne({}, {}, { sort: { date: -1 } }, (err, value) => {

        if (err) {
            return res.status(404).json({ message: 'No data found', });
        }

        console.log(value);
        return res.json(value);

    }).catch((err) => {
        throw new Error(err.message);
    });
};

exports.getLatestHumidity = (req, res) => {

    SensorModel.findOne({}, {}, { sort: { date: -1 } }, (err, value) => {

        if (err) {
            return res.status(404).json({ message: 'No data found', });
        }

        console.log(value);
        return res.json(value);

    }).catch((err) => {
        throw new Error(err.message);
    });
};

exports.getQueryValues = (req, res) => {

    if (req.query.since) {

        SensorModel.find()
            .gte('date', req.query.since)
            .sort('date')
            .exec((err, result) => {

                if (err) {
                    return res.status(404).json({ message: 'No data found', });
                }

                return res.json(result);

            }).catch((err) => {
            throw new Error(err.message);
        });
    }
};

exports.getAllValues = (req, res) => {

    SensorModel.find((err, value) => {

        console.log('Get all DHT values');
        if (err) {
            return res.status(500).json({ message: 'Server failed. Please try again!' });
        }

        console.log(value);
        return res.json(value);

    }).catch((err) => {
        throw new Error(err.message);
    });
};