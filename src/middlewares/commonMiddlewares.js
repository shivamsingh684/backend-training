
const jwt=require("jsonwebtoken");

//<========================================== authenticate ============================>
const authentication = async function(req,res,next){
    try {
        let token=req.headers["x-api-token"]
    if(!token) token=req.headers["X-API-TOKEN"]
    if(!token)return res.status(404).send({status:false,msg:"token is not present"})
    let decodedToken=jwt.verify(token,"FristProject")
    if(!decodedToken)return res.status(401).send({status:false,msg:"token is invalid"})
    req["decodedToken"]=decodedToken
    next()
    } catch (error) {
        res.status(500).send({status:false,msg:error})
    }
}

module.exports.authentication=authentication


//<======================================= authorization ================================>

const authorization=async function(req,res,next)