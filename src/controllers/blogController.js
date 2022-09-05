
const blogModel= require("../models/BlogModel")
const AuthorModel = require("../models/authorModel")
const { default: mongoose } = require("mongoose")

let verify= function(ObjectId){
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

const createblog= async function (req, res) {
    try{
    let data= req.body
    let authorId = data.authorId
    if(!authorId){
        return res.status(400).send({status:false,msg:"Enter valid Id"})
    }
    
    if(!verify(authorId)){
        return res.status(401).send({status:false,msg:"authorId is inValid"})
    }
    let findId=await AuthorModel.findById(authorId)
    if(!findId)return res.status(404).send({status:false,msg:"this authorId not exist"})
     let savedData= await blogModel.create(data)
    res.status(201).send({msg: savedData})
    
    }
    catch(err){
        res.status(500).send({msg:err.message})
    }
}
let get 


module.exports.createblog = createblog


















