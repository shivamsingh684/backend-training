const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");



const authenticate = async function(req, res, next) {
    //check the token in request header
    //validate this token
    try{   
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    if (!token) return res.status(404).send({ status: false, msg: "token must be present" });

    let decodedToken = jwt.verify(token, "functionup-thorium");
    if (!decodedToken) return res.status(403).send({ status: false, msg: "token is invalid" });
     
    let userId = req.params.userId;
    let userloggedin=decodedToken.userId
    if(userId!=userloggedin) return res.status(401).send({status:false,msg:"not a loggedin user"})  
    
    next()
    }
    catch(err){
        res.status(500).send({error:err.message})
    }
} 
  

// const authorise = function(req, res, next) {
//     // comapre the logged in user's id and the id in request
//     let token = req.headers["x-auth-token"];
   
//     let decodedToken = jwt.verify(token, "functionup-thorium");
    
//     next()
// }

module.exports = { authenticate }