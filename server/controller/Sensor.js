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

        if (data.type === 'Temperature' && data.value > 35) {
            console.log('DHT-value skipped because of fail when reading!');
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

exports.getLatestTemperature = (req, res) => {

    SensorModel.findOne({'type': 'Temperature'}, {}, { sort: { date: -1 } }, (err, value) => {

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

    SensorModel.findOne({'type': 'Humidity'}, {}, { sort: { date: -1 } }, (err, value) => {

        if (err) {
            return res.status(404).json({ message: 'No data found', });
        }

        return res.json(value);

    }).catch((err) => {
        throw new Error(err.message);
    });
};

exports.getQueryValues = (req, res) => {

    if (req.query.type && !req.query.since) {
        SensorModel.find()
            .sort('-date')
            .select(req.query.type)
            .limit(1)
            .exec((err, result) => {

                if (err) {
                    return res.status(404).json({ message: 'No data found', });
                }

                return res.json(result);

            });

    } else if (!req.query.type && req.query.since) {

        SensorModel.find()
            .gte('date', req.query.since)
            .sort('date')
            .exec((err, result) => {

                if (err) {
                    return res.status(404).json({ message: 'No data found', });
                }

                return res.json(result);

            });
    } else if (req.query.type && req.query.since) {

        SensorModel.find()
            .gte('date', req.query.since)
            .sort('date')
            .select(req.query.type)
            .select('date')
            .exec((err, result) => {

                if (err) {
                    return res.status(404).json({ message: 'No data found', });
                }

                return res.json(result);

            });
    }
};

exports.getAllValues = (req, res) => {

    SensorModel.find((err, value) => {

        console.log('Get all DHT values');
        if (err) {
            return res.status(500).json({ message: 'Server failed. Please try again!' });
        }

        return res.json(value);

    }).catch((err) => {
        throw new Error(err.message);
    });
};