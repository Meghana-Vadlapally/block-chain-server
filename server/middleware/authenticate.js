const User = require("../models/User.model");

var authenticate = (req, res, next) => {
    var bearerToken = req.header("Authorization");
    if(!bearerToken)
        res.status(401).send({ message: "Unauthorised access" });

    var token = bearerToken.split(" ")[1];
    User.validateUser(token)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(e => {
            res.status(401).send({ message: "User Not Authorised" });
        });
};
module.exports = authenticate;
