'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');

require('dotenv').config();

let startSensorsDB = require('./model/SensorsDB').startSensorsDB;
let startHueDB = require('./model/HueDB').startHueDB;

startSensorsDB();
startHueDB();

//let led = require('./controller/Led');
let sensor = require('./controller/Sensor');
let hue = require('./controller/Hue');
//let cameraServo = require('./controller/CameraServo');
//let motor = require('./controller/Motor');
let board = require('./controller/InitBoard');
let camera = require('./controller/Camera');

let app = express();
let port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

sensor.readInterval();
hue.readInterval();
board.initialize();

let actionRoutes = require('./routes/ActionRoutes');

actionRoutes(app);

app.use('/streamFiles', express.static('./streamFiles'));


app.listen(port, () => {
    console.log('API server started on: ' + port);
});