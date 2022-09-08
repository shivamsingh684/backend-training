const AuthorModel = require("../models/authorModel")
const { default: mongoose } = require("mongoose")
const blogModel = require("../models/BlogModel")


const authorVlidation = async function (req, res, next) {
    try {
        let data = req.body;
        let { fname, lname, title, email, password } = data

        if (!fname) { return res.status(400).send({ status: false, msg: "please provide the fname" }) }
        if (typeof data.fname !== "string") return res.status(400).send({ status: false, msg: " Please enter fname as a String" });
        if (!lname) { return res.status(400).send({ status: false, msg: "please provide the lname" }) }
        if (typeof data.lname !== "string") return res.status(400).send({ status: false, msg: " Please enter lname as a String" });
        if (!title) { return res.status(400).send({ status: false, msg: "please provide the title" }) }
        if (typeof data.title !== "string") return res.status(400).send({ status: false, msg: " Please enter title as a String" });

        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(email)) { return res.status(400).send({ status: false, msg: "please provide valid email" }) }

        let author = await AuthorModel.findOne({ email: email })
        if (author) { return res.status(400).send({ status: false, msg: "this email already exists please provide another email" }) }
        if (!password) { return res.status(400).send({ status: false, msg: "please provide the password" }) }
        next()

    }
    catch (error) {

        res.status(500).send({ status: false, msg: error.message })
    }

}


const mid2 = async (req, res, next) => {
    try {
        let verify = function (ObjectId) { return mongoose.Types.ObjectId.isValid(ObjectId) }
        let data1 = req.query
        
        let authorId = data1.authorId
        if (!authorId) {
            return res.status(400).send({ status: false, msg: "Enter valid Id" })
        }

        if (!verify(authorId)) {
            return res.status(401).send({ status: false, msg: "authorId is inValid" })
        }
        if (!data1) { return res.status(400).send({ status: false, msg: "please provide query data" }) }
       
        if (!verify(data1.authorId)) return res.status(404).send({ status: false, msg: "authorId is not valid" })

      

        next()
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}
const mid3 = async (req, res, next) => {
    try {

        const blogId = req.params.blogId
        let verify = function (ObjectId) { return mongoose.Types.ObjectId.isValid(ObjectId) }
        if (!blogId) return res.status(400).send({ status: false, msg: "please provide blogId" })
        if (!verify(blogId)) res.status(400).send({ status: false, msg: "blogId is invalid" })

        let blog = await blogModel.findById(blogId).select({ isDeleted: 1, _id: 0 });
        if (blog.isDeleted == true) return res.send("blog already deleted");
        next()
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}
const mid4 = async (req, res, next) => { 
    try {
        const data = req.query;
        let blog = await blogModel.find(data).select({ isDeleted: 1, _id: 0 });
        console.log(blog)
        for(let i=0;i<blog.length;i++){
        if (blog[i].isDeleted === true) return res.send("blog already deleted");
        console.log(blog[i].isDeleted)
        }
        next()
    }
    catch (error) {
       res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports.authorVlidation = authorVlidation

module.exports.mid2 = mid2

module.exports.mid3 = mid3

module.exports.mid4 = mid4 