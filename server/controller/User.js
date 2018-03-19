'use strict';

let mongoose = require('mongoose');
let Users = mongoose.model('Users');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

let getHateOasLinks = require('../model/HateOas').getHateOasLinks;

// Handling all events from UserRoutes

exports.getAllUsers = (req, res) => {

    Users.find({}, (err, value) => {

        console.log('Get all Users');
        if (err) {
            return res.status(500).json({ message: 'Server failed. Please try again!' });
        }

        value.forEach((i) => {
            i.hashedPassword = 0;
        });


        getHateOasLinks(value, 'user', 'getAllUsers').then((response) => {

            return res.json(response);
        }).catch(err);

    }).catch((err) => {
        throw new Error(err.message);
    });

};

exports.getSingleUser = (req, res) => {

    Users.findOne({
        _id: req.userId,

    }, (err, user) => {

        if (err) {
            return res.status(500).json({ message: 'Server failed. Please try again!' });
        }

        if (!user) {
            return res.status(404).json({ message: 'No user found', });
        }

        user.hashedPassword = 0;

        getHateOasLinks(user, 'user', 'getUser').then((response) => {

            return res.json(response);
        }).catch(err);

    }).catch((err) => {
        throw new Error(err.message);
    });
};

exports.deleteUser = (req, res) => {

    Users.remove({
        _id: req.userId,

    }, (err, user) => {

        if (err) {
            return res.status(500).json({ message: 'Server failed. Please try again!' });
        }

        if (!user) {
            return res.status(404).json({ message: 'No user found', });
        }

        let message = req.body.userName + ' was deleted.';

        getHateOasLinks(message, 'user', 'deleteUser').then((response) => {

            return res.json(response);
        });

    }).catch((err) => {
        throw new Error(err.message);
    });
};

exports.updateUser = (req, res) => {

    Users.findOneAndUpdate({
        _id: req.userId,

    }, req.body, (err, user) => {

        if (err) {
            return res.status(500).json({ message: 'Server failed. Please try again!' });
        }

        if (!user) {
            return res.status(404).json({ message: 'No user found', });
        }

        let message = req.body.userName + ' was updated.';

        getHateOasLinks(message, 'user', 'updateUser').then((response) => {

            return res.json(response);
        }).catch(err);

    }).catch((err) => {
        throw new Error(err.message);
    });
};

exports.registerUser = (req, res) => {

    // Check so username and password is between 6 & 20 characters
    if (req.body.userName.length < 6 || req.body.userName.length > 20) {
        return res.status(400).json({ auth: false, token: null, message: 'Username has to be between 6 and 20 characters.' });

    } else if (req.body.password.length < 6 || req.body.password.length > 20) {
        return res.status(400).json({ auth: false, token: null, message: 'Password has to be between 6 and 20 characters.' });

    } else {
        // Check if username is taken
        Users.count({
            userName: req.body.userName,
        }, (err, count) => {
            if (count > 0) {
                return res.status(400).json({ auth: false, token: null, message: 'Username is already taken' });
            } else {

                let newUser = new Users(req.body);

                //Hash password with bcrypt
                newUser.hashedPassword = bcrypt.hashSync(req.body.password);

                newUser.save((err, user) => {

                    if (err) {
                        return res.status(500).json({ auth: false, token: null, message: 'Server failed. Please try again!' });
                    }

                    // Assign a jwt-token to user. Expires in 24 hours!
                    let webToken = jwt.sign({ id: user._id }, process.env.WEB_TOKEN_SECRET, { expiresIn: 86400 });

                    user.hashedPassword = 0;

                    let data = { auth: true, token: webToken, user: user, };

                    getHateOasLinks(data, 'user', 'registerUser').then((response) => {

                        return res.json(response);
                    }).catch(err);

                });
            }
        });
    }

};

exports.loginUser = (req, res) => {

    Users.findOne({
        userName: req.body.userName,

    }, (err, user) => {

        if (err) {
            return res.status(500).json({ auth: false, token: null, message: 'Server failed. Please try again!' });
        }

        if (!user) {
            return res.status(401).send({ auth: false, token: null, message: 'Authentication failed. User not found.' });

        } else if (!bcrypt.compareSync(req.body.password, user.hashedPassword)) {
            return res.status(401).json({ auth: false, token: null, message: 'Authentication failed. Wrong password.' });
        }

        // Assign a jwt-token to user. Expires in 24 hours!
        let webToken = jwt.sign({ id: user._id }, process.env.WEB_TOKEN_SECRET, { expiresIn: 86400 });

        user.hashedPassword = 0;

        let data = { auth: true, token: webToken, user: user, };

        getHateOasLinks(data, 'user', 'loginUser').then((response) => {

            return res.json(response);
        }).catch(err);

    });
};