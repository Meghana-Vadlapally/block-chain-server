const jwt = require("jsonwebtoken");

var getUserId = req => {
    let token = req.headers.authorization.split(" ")[1];
    let decodedToken = jwt.decode(token);
    return decodedToken._id;
};

var isUserAdmin = req => {
    let token = req.headers.authorization.split(" ")[1];
    let decodedToken = jwt.decode(token);
    return decodedToken.isAdmin;
};

module.exports = {
    getUserId,
    isUserAdmin
};
