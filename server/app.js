'use strict';

let express = require('express');
let bodyParser = require('body-parser');

let led = require('./controller/Led');

let app = express();
let port = process.env.PORT || 8000;

app.use(bodyParser.json());

led.ledBlinkTest();

let actionRoutes = require('./routes/ActionRoutes');

actionRoutes(app);

app.listen(port, () => {
    console.log('API server started on: ' + port);
});