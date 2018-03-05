'use strict';

let express = require('express');
let bodyParser = require('body-parser');

require('dotenv').config();

let startSensorsDB = require('./model/SensorsDB').startSensorsDB;
let startHueDB = require('./model/HueDB').startHueDB;

startSensorsDB();
startHueDB();

let led = require('./controller/Led');
let sensor = require('./controller/Sensor');
let hue = require('./controller/Hue');
let cameraServo = require('./controller/CameraServo');
let motor = require('./controller/Motor');

let app = express();
let port = process.env.PORT || 8000;

app.use(bodyParser.json());

led.initialize();
//cameraServo.initialize();
sensor.readInterval();
hue.readInterval();
motor.initialize();

let actionRoutes = require('./routes/ActionRoutes');

actionRoutes(app);

app.listen(port, () => {
    console.log('API server started on: ' + port);
});