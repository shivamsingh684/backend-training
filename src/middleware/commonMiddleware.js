const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const mid = async (req, res, next) => {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    if (!token) return res.send({ status: false, msg: "token must be present" });
    let decodedToken = jwt.verify(token, "shivam singh");
    if (!decodedToken) return res.send({ status: false, msg: "token is invalid" });
    let userId = req.params.userId;
    let userloggedin=decodedToken.userId
    if(userId!=userloggedin) return res.send({status:false,msg:"not a loggedin user"})  
    next()
}

const mid2 = async (req, res, next) => {
    let userId = req.params.userId;
    let user = await userModel.findById(userId).select({isDeleted: 1,_id:0});
    if (user.isDeleted==true) return res.send("user already deleted");
    next()
}

module.exports = { mid, mid2 }