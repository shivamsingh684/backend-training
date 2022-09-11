
const blogModel = require("../models/BlogModel")
const AuthorModel = require("../models/authorModel")
const { default: mongoose } = require("mongoose")



let verify = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}
///<======================================== start  create blog =======================================>

const createblog = async function (req, res) {
    try {
        let data = req.body
        let authorId = data.authorId
        if(!authorId){return res.status(400).send({status:false,msg:"please provide authorId"})}
        if(!verify(authorId)){return res.status(400).send({status:false,msg:"authorId is invalid"})}
        
        if(!data.body){return res.status(400).send({status:false,msg:"please provide body"})}
        if(!data.title){return res.status(400).send({status:false,msg:"please provide title"})}
        if(data.category=="" || data.category ==[]){return res.status(400).send({status:false,msg:"please provide category"})}
        let findId = await AuthorModel.findById(authorId)
        if (!findId) return res.status(404).send({ status: false, msg: "this authorId not exist" })
        let savedData = await blogModel.create(data)
       return res.status(201).send({ msg: savedData })

    }
    catch (err) {
      return res.status(500).send({ msg: err.message })
    }
}

module.exports.createblog = createblog

//<=============================================== get api ===============================>

const getBlog = async function (req, res) {
    try {
        let data = req.query
        let {tags,category,subcategory,authorId}=data
        
        if(tags)  tags=tags.split(",").map(x=>x)
        if(category)  category=category.split(",").map(x=>x)
        if(subcategory)  subcategory=subcategory.split(",").map(x=>x)
   
      if(data.hasOwnProperty("tags")&& !tags){ return res.status(400).send({ status: false, msg: "please provide tags data" }) }
      if(data.hasOwnProperty("category")&& !category){ return res.status(400).send({ status: false, msg: "please provide category data" }) }
      if(data.hasOwnProperty("subcategory")&& !subcategory){ return res.status(400).send({ status: false, msg: "please provide subcategory data" }) }
      if(data.hasOwnProperty("authorId")&& !authorId){ return res.status(400).send({ status: false, msg: "please provide authorId data" }) }
      if(authorId){
        if(!verify(authorId)){return res.status(400).send({status:false,msg:"authorId is invalid"})}
      }
       
        let query = { isDeleted: false, isPublished: true }
        if (authorId) query.authorId =authorId
        if(tags) query.tags={$all:tags}
        if(category) query.category={$all:category}
        if(subcategory) query.subcategory={$all:subcategory}
        
        const getData = await blogModel.find(query);
        if (Object.keys(getData).length != 0) {
            return res.status(200).send({ status: true, data: getData })
        } else {
           return res.status(404).send({ status: false, msg: "document not found" })
        }

    } catch (error) {
        res.status(500).send({status:false, msg: error })

    }
}

module.exports.getBlog = getBlog

//<======================================= put api ======================================>

const updateBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId
        
        let data = req.body
        let { title, body, subcategory, tags } = data
        
        const blogUpdate = await blogModel.findOneAndUpdate({ _id: blogId }, {
            $set: { title, body, isPublished: true, publishedAt: new Date() },
            $push: { tags, subcategory }
        }, {  upsert: true,new: true })

        res.status(200).send({ status: true, data: blogUpdate })


    } catch (error) {
        res.status(500).send({ msg: error })
    }
}

module.exports.updateBlog = updateBlog

//<============================================= Deleted api ============================================>

const deletedBlog = async function (req, res) {
    try {
       
        const blogId = req.params.blogId
       
        const update = await blogModel.findOneAndUpdate({ _id: blogId}, { $set: { isDeleted: true } }, { new: true })
        res.status(200).send({ status: true, data: update })

    }

    catch (err) 
    {
        res.status(500).send({status:false, msg: err })
    }
}
module.exports.deletedBlog = deletedBlog

//<=============================== deleted api by query ==================================>

const deleteByQuery = async function (req, res) {
    try {
        
        const data = req.query;
      
        const upodsate= await blogModel.updateMany(data,{isDeleted:true,deletedAt:new Date()})
       
        return res.status(200).send({status:true,msg:upodsate})

    } catch (error) {
      return  res.status(500).send({catch:2, msg: error })
   }
}
module.exports.deleteByQuery = deleteByQuery

//<================================================== end ===============================>













