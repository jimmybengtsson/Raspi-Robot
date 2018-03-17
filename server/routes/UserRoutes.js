'use strict';

// Handling all routes for users

module.exports = (app) => {

    let users = require('../controller/User');
    let verifyWebToken = require('../controller/JWTAuthorization');

    // ToDo add hateoas links
    app.route('/info')
        .get((req, res) => {
            res.json({message: 'ToDo'});
        });

    app.route('/user/all')
        .get(users.getAllUsers);

    app.route('/user')
        .get(verifyWebToken, users.getSingleUser)
        .delete(verifyWebToken, users.deleteUser)
        .put(verifyWebToken, users.updateUser);

    app.route('/register')
        .post(users.registerUser);

    app.route('/login')
        .post(users.loginUser);

};
