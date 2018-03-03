'use strict';

let express = require('express');
let bodyParser = require('body-parser');

require('dotenv').config();

let startSensorsDB = require('./model/SensorsDB').startSensorsDB;

startSensorsDB();

let led = require('./controller/Led');
let sensor = require('./controller/Sensor');

let app = express();
let port = process.env.PORT || 8000;

app.use(bodyParser.json());

led.ledBlinkTest();
sensor.readInterval();

let actionRoutes = require('./routes/ActionRoutes');

actionRoutes(app);

app.listen(port, () => {
    console.log('API server started on: ' + port);
});