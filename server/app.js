'use strict';

let express = require('express');
let bodyParser = require('body-parser');

let actionRoutes = require('./routes/ActionRoutes');

let led = require('./controller/Led');

let app = express();
let port = process.env.PORT || 8000;

app.use(bodyParser.json());

actionRoutes(app);

app.listen(port, () => {
    console.log('API server started on: ' + port);
});