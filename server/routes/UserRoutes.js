'use strict';

let hateOas = require('../model/HateOas').hateOasObj;
let info = require('../data/Info');

// Handling all routes for users

module.exports = (app) => {

    let users = require('../controller/User');
    let verifyWebToken = require('../controller/JWTAuthorization');

    app.route('/model')
        .get((req, res) => {
            res.json({data: info, links: hateOas});
        });

    app.route('/user')
        .get(verifyWebToken, users.getSingleUser)
        .delete(verifyWebToken, users.deleteUser)
        .put(verifyWebToken, users.updateUser);

    app.route('/register')
        .post(users.registerUser);

    app.route('/login')
        .post(users.loginUser);

};
