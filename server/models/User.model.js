const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require("jsonwebtoken");
const SALT_WORK_FACTOR = 10;
const CONFIG = require("../config");

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        minLength: 5
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        minLength: 5
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    email: {
        type: String
    }
});

/**
 * Password hashing
 */
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});


UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        cb(err, isMatch);
    });
};

UserSchema.methods.generateAuthToken = function() {
    return new Promise((resolve, reject) => {
        var user = this;
        var token = jwt
            .sign(
                {
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 30 , //1 hr
                    _id: user._id.toHexString(),
                    userName: user.userName,
                    isAdmin: user.isAdmin
                },
                CONFIG.JWT_SECRET
            )
            .toString();
        resolve(token);
    });
};

UserSchema.statics.validateUser = function(token) {
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token, CONFIG.JWT_SECRET);
    } catch (e) {
        return Promise.reject();
    }
    return User.findOne({
        _id: decoded._id
    });
};

UserSchema.plugin(uniqueValidator);

const User = mongoose.model("User", UserSchema);

module.exports = User;