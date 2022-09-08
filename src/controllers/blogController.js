
const blogModel = require("../models/BlogModel")
const AuthorModel = require("../models/authorModel")
const { default: mongoose } = require("mongoose")

let verify = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}
///<======================================== start =======================================>

const createblog = async function (req, res) {
    try {
        let data = req.body
        let authorId = data.authorId
        let findId = await AuthorModel.findById(authorId)
        if (!findId) return res.status(404).send({ status: false, msg: "this authorId not exist" })
        let savedData = await blogModel.create(data)
        res.status(201).send({ msg: savedData })

    }
    catch (err) {
       res.status(500).send({ msg: err.message })
    }
}

module.exports.createblog = createblog

//<=============================================== get api ===============================>

const getBlog = async function (req, res) {
    try {
        let data = req.query

        //if (Object.keys(data).length===0 || data.length===undefined) { return res.status(400).send({ status: false, msg: "query or query value missing" })}
        //  let {tags}=data
        //  tags=tags.split(",").map(x=>x)
        let query = { isDeleted: false, isPublished: true }
        if (data.authorId) query.authorId = data.authorId
        if (data.tags) query.tags =  data.tags ;
        if (data.category) query.category = data.category
        if (data.subcategory) query.subcategory = data.subcategory
        
       
        const getData = await blogModel.find(query);
        if (Object.keys(getData).length != 0) {
            res.status(200).send({ status: true, data: getData })
        } else {
            res.status(404).send({ status: false, msg: "document not found" })
        }
    } catch (error) {
        res.status(500).send({ msg: error })

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
        }, { new: true, upsert: true })

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
        //const checkId = await blogModel.findById(blogId).select({ isDeleted: 1, _id: 0 })
        //console.log(checkId)
        const update = await blogModel.findOneAndUpdate({ _id: blogId}, { $set: { isDeleted: true } }, { new: true })
        res.status(200).send({ status: true, data: update })

    }

    catch (err) 
    {
        res.status(500).send({ msg: err })
    }
}
module.exports.deletedBlog = deletedBlog

//<=============================== deleted api by query ==================================>

const deleteByQuery = async function (req, res) {
    try {
        const data = req.query;

        if (!data) { return res.status(400).send({ status: false, msg: "please provide data" }) }
        if (Object.keys(data).length == 0) return res.status(400).send({ msg: "please provide query" })
        const deleteData = await blogModel.updateMany(data, { $set: { isDeleted: true } }, { new: true })
        res.status(200).send({ status: true, data: deleteData })
        if (!deleteData) return res.status(404).send({ status: false, msg: "document not exist" })

    } catch (error) {
        res.status(500).send({ msg: error })
   }
}
module.exports.deleteByQuery = deleteByQuery

//<================================================== end ===============================>













