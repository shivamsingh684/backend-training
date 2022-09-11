
const jwt=require("jsonwebtoken");
const BlogModel = require("../models/BlogModel");

//<========================================== authenticate ============================>
const authentication =  function(req,res,next){
    try {
    let token=req.headers["x-api-key"]
   
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

const authorization= async function(req,res,next){
    try{
       decodedToken=req["decodedToken"]
       
        let blogId = req.params.blogId;
        let authorId1=await BlogModel.findById({_id:blogId})
        let authorId=authorId1.authorId.toString()
      
        let userloggedin=decodedToken.authorId
       console.log()
        if(authorId!==userloggedin) return res.send({status:false,msg:"not a loggedin author"})  
        next()
    }
    catch (error) {
    res.status(500).send({status:false,msg:error})
    }
}

module.exports.authorization=authorization 