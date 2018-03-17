'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

function startSensorsDB() {

    let db = mongoose.connection;

    db.on('error', (error) => {
        console.log('connection error', error);
    });

    db.once('open', () => {
        console.log('Sensor database connected.');
    });

    process.on('SIGINT', () => {
        db.close(() => {
            console.log('Mongoose disconnected because of app termination.');
            process.exit(0);
        });
    });

    // Connect

    mongoose.Promise = global.Promise;

    return mongoose.connect(process.env.SENSORS_DB_CONNECTION);

}

let SensorsSchema = new Schema({

    date: {
        type: Date,
        default: Date.now(),
        required: true,
    },

    timestamp: {
        type: Number,
    },

    type: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
    },
    unit:  {
        type: String,
    },
    unit_display:  {
        type: String,
    },
    sensor_name:  {
        type: String,
    },
    sensor_type:  {
        type: String,
    },
});

module.exports = mongoose.model('Sensors', SensorsSchema, 'Sensors');
module.exports.startSensorsDB = startSensorsDB;

