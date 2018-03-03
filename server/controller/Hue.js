'use strict';

let mongoose = require('mongoose');
let SensorModel = mongoose.model('Hue');
let huejay = require('huejay');
let Hue = require('philips-hue');
let hue = new Hue();
let fs = require('fs-extra');

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
                fetchValues();
            }
        })
        .catch(err => {
            console.error(err)
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

    let client = new huejay.Client(clientTemp);
    console.log(clientTemp);

    client.sensors.getAll()
        .then(sensors => {
            for (let sensor of sensors) {
                console.log(sensor);
            }
        })
        .catch(error => {
            console.log(error.stack);
        });
};