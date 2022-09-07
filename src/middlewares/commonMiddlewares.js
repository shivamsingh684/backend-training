
const jwt=require("jsonwebtoken");

//<========================================== authenticate ============================>
const authentication =  function(req,res,next){
    try {
    let token=req.headers["x-api-key"]
    // if(!token) token=req.headers["X-API-TOKEN"]
    if(!token)return res.status(404).send({status:false,msg:"token is not present"})
    let decodedToken=jwt.verify(token,"FirstProject")
    if(!decodedToken)return res.status(401).send({status:false,msg:"token is invalid"})
    req["decodedToken"]=decodedToken
    next()
    } catch (error) {
        res.status(500).send({status:false,msg:error})
    }
}

module.exports.authentication=authentication


//<======================================= authorization ================================>

const authorization= function(req,res,next){
    try{
        let token = req.headers["x-api-key"];
        let author = req.query.authorId;
        let decodedToken = jwt.verify(token,"FirstProject");
        let userloggedin=decodedToken.authorId
        if(author!=userloggedin) return res.send({status:false,msg:"not a loggedin author"})  
        next()
    }
    catch (error) {
    res.status(500).send({status:false,msg:error})
    }
}

module.exports.authorization=authorization