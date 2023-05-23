const jwt = require("jsonwebtoken");

const authenticate = function (req, res, next) {
    //check the token in request header
    //validate this token
    let token = req.headers['x-auth-token'];

    if (!token) {
        return res.send({ status: false, msg: "Token must be present" });
    }

    let decodedToken = jwt.verify(token, "My secret key for token generation");
    if (!decodedToken) {
        return res.send({ status: false, msg: "Invalid Token" });
    }
    req.user = decodedToken;
    next()
}


const authorise = function (req, res, next) {
    // comapre the logged in user's id and the id in request
    let loggedInUserId = req.user.userId;
    let requestId = req.params.userId;
    if (loggedInUserId != requestId) {
        return res.send({ status: false, msg: "User is not authorised for this request" });
    }
    next()
};

module.exports.authenticate = authenticate;
module.exports.authorise = authorise;