'use strict';

let mongoose = require('mongoose');
let HueModel = mongoose.model('Hue');
let huejay = require('huejay');
let Hue = require('philips-hue');
let hue = new Hue();
let fs = require('fs-extra');

let getHateOasLinks = require('../model/HateOas').getHateOasLinks;

hue.devicetype = 'my-hue-app';

let clientTemp = {
    host:     '',
    username: '',
    timeout:  15000,
};

exports.readInterval = () => {

    fs.readJson('./data/HueConfig.json')
        .then((data) => {
            if (data.HueHost === null || data.HueUser === null) {
                hueAutho()
                    .then(fetchValues);
            } else {
                clientTemp.host = data.HueHost;
                clientTemp.username = data.HueUser;
                setInterval(() => {
                    fetchValues();
                }, 300000);
            }
        })
        .catch(err => {
            console.error(err)
        });
};

exports.notifications = (req, res) => {

    fs.readJson('./data/HueConfig.json')
        .then((data) => {
            if (data.HueHost === null || data.HueUser === null) {
                hueAutho()
                    .then(blinkLight);
            } else {
                clientTemp.host = data.HueHost;
                clientTemp.username = data.HueUser;
                blinkLight();
            }
        })
        .then(() => {
            let message = 'Hue flash';

            getHateOasLinks(message, 'action', 'actionHueBlink').then((response) => {

                return res.json(response);
            }).catch((err) => {
                throw new Error(err);
            });
        })
        .catch(err => {
            console.error(err)
        });
};

exports.getLatestValues = (req, res) => {

    HueModel.findOne({}, {}, { sort: { date: -1 } }, (err, value) => {

        if (err) {
            return res.status(404).json({ message: 'No data found', });
        }

        getHateOasLinks(value, 'properties', 'propertiesHueLatest').then((response) => {

            return res.json(response);
        }).catch((err) => {
            throw new Error(err);
        });

    }).catch((err) => {
        throw new Error(err.message);
    });
};

exports.getQueryValues = (req, res) => {

    if (req.query.since) {

        HueModel.find()
            .gte('date', req.query.since)
            .sort('date')
            .exec((err, result) => {

                if (err) {
                    return res.status(404).json({ message: 'No data found', });
                }

                return res.json(result);

            });
    }
};

exports.getAllValues = (req, res) => {

    HueModel.find((err, value) => {

        console.log('Get all DHT values');
        if (err) {
            return res.status(500).json({ message: 'Server failed. Please try again!' });
        }

        return res.json(value);

    }).catch((err) => {
        throw new Error(err.message);
    });
};

let hueAutho = () => {

    return hue.getBridges()
        .then(function(bridges){
            console.log(bridges);
            let bridge = bridges[0];
            clientTemp.host = bridge;
            console.log("bridge: "+bridge);
            return hue.auth(bridge);
        })
        .then(function(username){
            console.log("username: "+username);
            clientTemp.username = username;
        })
        .then(() => {
            fs.writeJson('./data/HueConfig.json', {HueHost: clientTemp.host, HueUser: clientTemp.username})
                .then(() => {
                    console.log('Saved Hue-bridge config!')
                })
                .catch(err => {
                    console.error(err)
                })
        })
        .catch(function(err){
            console.error(err.stack || err);
        });

};

let fetchValues = () => {

    let newHueModel = new HueModel();

    let client = new huejay.Client(clientTemp);
    client.sensors.getAll()
        .then(sensors => {
            for (let sensor of sensors) {
                if (sensor.name === 'Hallen') {
                    newHueModel.Hallway.lastMovement = sensor.state.attributes.attributes.lastupdated;
                }
                if (sensor.name === 'Hue temperature sensor 1') {
                    newHueModel.Hallway.temperature = sensor.state.temperature;
                }
                if (sensor.name === 'Hue ambient light sensor 1') {
                    newHueModel.Hallway.lightlevel = sensor.state.lightlevel;
                    newHueModel.Hallway.dark = sensor.state.dark;
                    newHueModel.Hallway.daylight = sensor.state.daylight;
                }
                if (sensor.name === 'Köket') {
                    newHueModel.Kitchen.lastMovement = sensor.state.attributes.attributes.lastupdated;
                }
                if (sensor.name === 'Hue temperature sensor 2') {
                    newHueModel.Kitchen.temperature = sensor.state.temperature;
                }
                if (sensor.name === 'Hue ambient light sensor 2') {
                    newHueModel.Kitchen.lightlevel = sensor.state.lightlevel;
                    newHueModel.Kitchen.dark = sensor.state.dark;
                    newHueModel.Kitchen.daylight = sensor.state.daylight;
                }
                if (sensor.name === 'Källaren') {
                    newHueModel.Basement.lastMovement = sensor.state.attributes.attributes.lastupdated;
                }
                if (sensor.name === 'Hue temperature sensor 3') {
                    newHueModel.Basement.temperature = sensor.state.temperature;
                }
                if (sensor.name === 'Hue ambient light sensor 3') {
                    newHueModel.Basement.lightlevel = sensor.state.lightlevel;
                    newHueModel.Basement.dark = sensor.state.dark;
                    newHueModel.Basement.daylight = sensor.state.daylight;
                }
                if (sensor.name === 'Tvättstugan') {
                    newHueModel.Laundry.lastMovement = sensor.state.attributes.attributes.lastupdated;
                }
                if (sensor.name === 'Hue temperature sensor 4') {
                    newHueModel.Laundry.temperature = sensor.state.temperature;
                }
                if (sensor.name === 'Hue ambient light sensor 4') {
                    newHueModel.Laundry.lightlevel = sensor.state.lightlevel;
                    newHueModel.Laundry.dark = sensor.state.dark;
                    newHueModel.Laundry.daylight = sensor.state.daylight;
                }

            }
        })
        .then(() => {

            newHueModel.date = new Date();

            newHueModel.save((err, value) => {

                if (err) {
                    throw new Error(err);
                }

                console.log('Saved to Hue db: ' + value);

                return value;
            });
        })
        .catch(error => {
            console.log(error.stack);
        });
};

let blinkLight = () => {

    let client = new huejay.Client(clientTemp);
    client.lights.getAll()
        .then(lights => {
            for (let light of lights) {


                if (light.name === 'Kontoret') {

                    light.alert = 'lselect';

                    setTimeout(() => {
                        light.alert = 'none';
                        client.lights.save(light);
                    }, 5000);

                    return client.lights.save(light);
                }
            }
        })
        .catch(error => {
            console.log(error.stack);
        });
};

exports.lightOn = (req, res) => {

    let client = new huejay.Client(clientTemp);
    client.lights.getAll()
        .then(lights => {
            for (let light of lights) {


                if (light.name === 'Kontoret') {

                    light.on = true;

                    client.lights.save(light);

                    let message = 'Hue on';

                    getHateOasLinks(message, 'action', 'actionHueOn').then((response) => {

                        return res.json(response);
                    }).catch((err) => {
                        throw new Error(err);
                    });
                }
            }
        })
        .catch(error => {
            console.log(error.stack);
        });
};

exports.lightOff = (req, res) => {

    let client = new huejay.Client(clientTemp);
    client.lights.getAll()
        .then(lights => {
            for (let light of lights) {

                if (light.name === 'Kontoret') {

                    light.on = false;

                    client.lights.save(light);
                    let message = 'Hue off';

                    getHateOasLinks(message, 'action', 'actionHueOff').then((response) => {

                        return res.json(response);
                    }).catch((err) => {
                        throw new Error(err);
                    });
                }
            }
        })
        .catch(error => {
            console.log(error.stack);
        });
};

exports.getState = (req, res) => {

    let client = new huejay.Client(clientTemp);
    client.lights.getAll()
        .then(lights => {
            for (let light of lights) {

                if (light.name === 'Kontoret') {
                    if(light.on === false) {
                        let state = 'false';

                        getHateOasLinks(state, 'properties', 'propertiesHueState').then((response) => {

                            return res.json(response);
                        }).catch((err) => {
                            throw new Error(err);
                        });
                    } else {
                        let state = 'true';

                        getHateOasLinks(state, 'properties', 'propertiesHueState').then((response) => {

                            return res.json(response);
                        }).catch((err) => {
                            throw new Error(err);
                        });
                    }
                }
            }
        })
        .catch(error => {
            console.log(error.stack);
        });
};