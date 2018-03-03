'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

function startHueDB() {

    let db = mongoose.connection;

    db.on('error', (error) => {
        console.log('connection error', error);
    });

    db.once('open', () => {
        console.log('Hue database connected.');
    });

    process.on('SIGINT', () => {
        db.close(() => {
            console.log('Mongoose disconnected because of app termination.');
            process.exit(0);
        });
    });

    // Connect

    mongoose.Promise = global.Promise;

    return mongoose.connect(process.env.HUE_DB_CONNECTION);

}

let HueSchema = new Schema({

    date: {
        type: Date,
        default: Date.now(),
        required: true,
    },

    timestamp: {
        type: Number,
    },
    Kitchen: {
        temperature: {
            type: Number,
        },
        lastMovement: {
            type: Date,
        },
        lightlevel: {
            type: Number,
        },
        dark: {
            type: Boolean,
        },
        daylight: {
            type: Boolean
        },
    },
    Hallway: {
        temperature: {
            type: Number,
        },
        lastMovement: {
            type: Date,
        },
        lightlevel: {
            type: Number,
        },
        dark: {
            type: Boolean,
        },
        daylight: {
            type: Boolean
        },
    },
    Basement: {
        temperature: {
            type: Number,
        },
        lastMovement: {
            type: Date,
        },
        lightlevel: {
            type: Number,
        },
        dark: {
            type: Boolean,
        },
        daylight: {
            type: Boolean
        },
    },
    Laundry: {
        temperature: {
            type: Number,
        },
        lastMovement: {
            type: Date,
        },
        lightlevel: {
            type: Number,
        },
        dark: {
            type: Boolean,
        },
        daylight: {
            type: Boolean
        },
    },
});

module.exports = mongoose.model('Hue', HueSchema);
module.exports.startHueDB = startHueDB;

