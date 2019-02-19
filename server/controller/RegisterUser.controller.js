const _ = require('lodash');
var User = require("../models/User.model");

const RegisterUser = function (req, res, next) {
    const data = _.pick(req.body, ['fullName', 'userName', 'password', 'email']);

    if(data.userName && data.password && data.fullName) {
       User.create(data)
           .then(function(user) {
               user.generateAuthToken().then(token => {
                   res.header("Authorization", token).send({message: 'User created successfully!', token: token});
               });
           })
           .catch(error => {
               console.log(error);
               if(error.errors.userName.kind === 'unique') {
                   res.status(500).send({message: 'User name already exist.'})
               } else {
                   res.status(500).send({message:'Unable to create user, please try again!'});
               }
           })
    } else {
        res.status(400).send({ message: "User name or password or full Name missing" });
    }
};

module.exports = RegisterUser;

function table(tableName) {
    for(i=1;i<=10;i++) {
        console.log(tableName+' x '+ i +' = '+tableName*i);
    }
}
