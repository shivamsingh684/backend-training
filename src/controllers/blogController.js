
const blogModel= require("../models/BlogModel")
const AuthorModel = require("../models/authorModel")
const { default: mongoose } = require("mongoose")

let verify= function(ObjectId){
    return mongoose.Types.ObjectId.isValid(ObjectId)
}
///<======================================== start =======================================>

const createblog= async function (req, res) {
    try{
    let data= req.body
    let authorId = data.authorId
    if(!authorId){
        return res.status(400).send({status:false,msg:"please provide authorId"})
    }
    
    if(!verify(authorId)){
        return res.status(400).send({status:false,msg:"authorId is inValid"})
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

module.exports.createblog = createblog

//<=============================================== get api ===============================>

const getBlog=async function(req,res){
    try {
        let data=req.query
        // console.log(data)
        if(!data){return res.status(400).send({status:false,msg:"please provide query data"})}
        let query={isDeleted:false,isPublished:true}
      
        if (data.authorId) {if(data.authorId){if(!verify(data.authorId)){return res.status(400).send("authorId is not valid")}else{query.authorId = data.authorId;} }}
        // if(data.authorId) query.authorId=data.authorId
        // console.log(query)
        if(data.tags) query.tags={ $in:data.tags};
        if(data.category) query.category= data.category
        if(data.subcategory) query.subcategory=data.subcategory
        const getData= await blogModel.find(query);
        if(Object.keys(getData).length !=0){
            res.status(200).send({status:true,data:getData})
        }else{
            res.status(404).send({status:false,msg:"document not found"})
        }

        
    } catch (error) {
        res.status(500).send({msg:error})
        
    }
}

module.exports.getBlog=getBlog

//<======================================= put api ======================================>

const updateBlog=async function(req,res){
    try {
        const blogId=req.params.blogId
        if(!blogId)return res.status(400).send({status:false,msg:"please provide blogId"})
        if(!verify(blogId)) res.status(400).send({status:false,msg:"blogId is invalid"})
        let {title,body,subcategory,tags}=req.body
       // if(!title || title.trim().length==0)return res.status(400).send({status:false,msg:"please provide title"})
        const isdelete=await blogModel.findById(blogId).select({isDeleted:1,_id:0})
        if(isdelete.isDeleted===true){return res.status(404).send({msg:"user not found"})}
        const blogUpdate=await blogModel.findByIdAndUpdate(blogId,{$set:{title,body,subcategory,tags,isPublished:true,publishedAt:new Date()}},{upsert:true})
        
        res.status(200).send({status:true,data:blogUpdate})
        
     
    } catch (error) {
        res.status(500).send({msg:error})
    }
}

module.exports.updateBlog=updateBlog

//<============================================= Deleted api ============================================>

const deletedBlog=async function(req,res){
    try{
const blogId=req.params.blogId
if(!blogId)return res.status(400).send({status:false, msg:"please provide blogId"})
if(!verify(blogId))return res.status(400).send({msg:"blogId is invalid"})
 const checkId=await blogModel.findById(blogId).select({isDeleted:1,_id:0})
 if(checkId.isDeleted===false){
 const update=await blogModel.findOneAndUpdate({_id:blogId},{$set:{isDeleted:true}},{new:true})
 res.status(200).send({status:true,data:update})
 }else{
    return res.status(404).send({msg:" document already deleted"})
 }

}catch(err){
   res.status(500).send({msg:err})
}
}
module.exports.deletedBlog=deletedBlog

//<=============================== deleted api by query ==================================>

const deleteByQuery=async function(req,res){
    try {
        const data=req.query;
        // console.log(data)
        if(!data){return res.status(400).send({status:false,msg:"please provide data"})}
        if(Object.keys(data).length ==0)return res.status(400).send({msg:"please provide query" })
        const deleteData=await blogModel.findOneAndUpdate(data,{$set:{isDeleted:true}},{new:true})
        res.status(200).send({status:true,data:deleteData})
        if(!deleteData)return res.status(404).send({status:false,msg:"document not exist"})
        
    } catch (error) {
        res.status(500).send({msg:error})
    }
}
module.exports.deleteByQuery=deleteByQuery

//<================================================== end ===============================>











