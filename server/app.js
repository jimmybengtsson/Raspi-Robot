'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');

require('dotenv').config();

let startSensorsDB = require('./model/SensorsDB').startSensorsDB;
let startHueDB = require('./model/HueDB').startHueDB;
let startUserDB = require('./model/UserDB').startUserDB;

startSensorsDB();
startHueDB();
startUserDB();

//let led = require('./controller/Led');
let sensor = require('./controller/Sensor');
let hue = require('./controller/Hue');
//let cameraServo = require('./controller/CameraServo');
//let motor = require('./controller/Motor');
let board = require('./controller/InitBoard');
let camera = require('./controller/Camera');

let app = express();
let port = process.env.PORT || 8000;
let expressWs = require('express-ws')(app);

app.use(bodyParser.json());
app.use(cors());

sensor.readInterval();
hue.readInterval();
board.initialize();

let actionRoutes = require('./routes/ActionRoutes');
let socketRoutes = require('./routes/WebSocketRoutes');
let propertiesRoutes = require('./routes/PropertiesRoutes');

actionRoutes(app);
socketRoutes(app);
propertiesRoutes(app);

app.use('/streamFiles', express.static('./streamFiles'));


app.listen(port, () => {
    console.log('API server started on: ' + port);
});