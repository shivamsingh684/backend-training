const jwt = require("jsonwebtoken");



const authenticate = function(req, res, next) {
    //check the token in request header
    //validate this token
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    if (!token) return res.send({ status: false, msg: "token must be present" });
    let decodedToken = jwt.verify(token, "functionup-thorium");
    if (!decodedToken) return res.send({ status: false, msg: "token is invalid" });

    next()
}
  

const authorise = function(req, res, next) {
    // comapre the logged in user's id and the id in request
    let token = req.headers["x-auth-token"];
    let userId = req.params.userId;
    let decodedToken = jwt.verify(token, "functionup-thorium");
    let userloggedin=decodedToken.userId
    if(userId!=userloggedin) return res.send({status:false,msg:"not a loggedin user"})  
    next()
}

module.exports = { authenticate, authorise }