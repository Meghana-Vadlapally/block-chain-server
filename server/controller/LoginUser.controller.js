const User = require("../models/User.model");
const _ = require('lodash');

const LoginUser = function (req, res, next) {
    const data = _.pick(req.body, ['userName', 'password']);

   if(data.userName.trim() && data.password.trim()) {
        User.findOne({userName: data.userName}, function (err, user) {
            if(user) {
                user.comparePassword(data.password, function (err, isMatch) {
                    if (err) res.status(500).send({message: 'Unable to process request'});
                    else if (!isMatch) res.status(401).send({message: 'Invalid user name or password'});

                    user.generateAuthToken().then(token => {
                        res.header("Authorization", token).send({message: 'valid user....', token: token});
                    });
                });
            } else {
                res.status(400).send({message: 'Invalid user name or password'});
            }
        });
    } else {
        res.status(400).send({message: 'Invalid user name or password'});
    }



};

module.exports = LoginUser;
