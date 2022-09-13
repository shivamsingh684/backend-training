const AuthorModel = require("../models/authorModel")
const { default: mongoose } = require("mongoose")
const blogModel = require("../models/BlogModel")
const jwt = require("jsonwebtoken")


const authorVlidation = async function (req, res, next) {
    try {
        let data = req.body;
        let { fname, lname, title, email, password } = data

        if (!fname) { return res.status(400).send({ status: false, msg: "please provide the fname" }) }
        if (!(/^[a-zA-Z ]{2,30}$/).test(fname)) return res.status(400).send({ status: false, msg: " Please enter fname as A-Z or a-z" });
        if (!lname) { return res.status(400).send({ status: false, msg: "please provide the lname" }) }
        if (!(/^[a-zA-Z ]{2,30}$/).test(lname)) return res.status(400).send({ status: false, msg: " Please enter lname as  A-Z or a-z" });
        if (!title) { return res.status(400).send({ status: false, msg: "please provide the title" }) }
        if (!(/^[a-zA-Z ]{2,30}$/).test(title)) return res.status(400).send({ status: false, msg: " Please enter title as  A-Z or a-z" });

        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(email)) { return res.status(400).send({ status: false, msg: "please provide valid email" }) }

        let author = await AuthorModel.findOne({ email: email })
        if (author) { return res.status(400).send({ status: false, msg: "this email already exists please provide another email" }) }
        if (!password) { return res.status(400).send({ status: false, msg: "please provide the password" }) }
        function checkPassword(str) {
            var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
            return re.test(str);
        }
        if (!checkPassword(password)) { return res.status(400).send({ status: false, msg: "password should contain at least 1 lowercase, uppercase ,numeric alphabetical character and at least one special character and also The string must be eight characters or longer" }) }
       
        next()

    }
    catch (error) {

        res.status(500).send({ status: false, msg: error })
    }

}
//<=======================================updateValidation ===============================>

const updateValidation = async function (req, res, next) {
    try {

        const blogId = req.params.blogId
        let verify = function (ObjectId) { return mongoose.Types.ObjectId.isValid(ObjectId) }
        if (!blogId) return res.status(400).send({ status: false, msg: "please provide blogId" })
        if (!verify(blogId)) res.status(400).send({ status: false, msg: "blogId is invalid" })

        let blog = await blogModel.findById(blogId).select({ isDeleted: 1, _id: 0 });
        if (blog.isDeleted == true) return res.status(404).send("blog already deleted");
        next()
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}
module.exports.updateValidation = updateValidation


//<============================================ deleteByQuery ============================>


const delByQeury = async function (req, res, next) {
    try {

        const token = req.headers["x-api-key"]
        let data = req.query
        let { tags, category, subcategory, authorId, isPublished } = data
        if (tags) tags = tags.split(",").map(x => x)
        if (category) category = category.split(",").map(x => x)
        if (subcategory) subcategory = subcategory.split(",").map(x => x)

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "please provide query" })
        const decodedToken = jwt.verify(token, "FirstProject")
        const authorIdFrom = decodedToken.authorId

        let query = { authorId: authorIdFrom }

        if (data.hasOwnProperty("tags") && !tags) { return res.status(400).send({ status: false, msg: "please provide tags data" }) }
        if (data.hasOwnProperty("category") && !category) { return res.status(400).send({ status: false, msg: "please provide category data" }) }
        if (data.hasOwnProperty("subcategory") && !subcategory) { return res.status(400).send({ status: false, msg: "please provide subcategory data" }) }
        if (data.hasOwnProperty("authorId") && !authorId) { return res.status(400).send({ status: false, msg: "please provide authorId data" }) }
        if (data.hasOwnProperty("isPublished") && !isPublished) { return res.status(400).send({ status: false, msg: "please provide isPublished data" }) }
        if (tags) query.tags = { $all: tags }
        if (category) query.category = { $all: category }
        if (authorId) query.authorId = authorId

        if (subcategory) query.subcategory = { $all: subcategory }
        if (!(Object.keys(query).length) > 0) { return res.status(400).send({ msg: "please provide query" }) }
        let allData = await blogModel.find(query).select({ authorId: 1, _id: 0, isDeleted: 1, isPublished: 1 })
        //console.log(allData)
        if (allData.isPublished == false) {
            if (isPublished) query.isPublished = isPublished
        }

        if (allData.length > 0) {
            let count = 0
            for (let i = 0; i < allData.length; i++) {

                //console.log(allData[i].isDeleted)


                if (allData[i].isDeleted == true) {
                    count++

                }
                if (count == allData.length) {
                    return res.status(204).send({ msg: "your data is already Deleted" })
                }
            }
        }


        if (allData.length == 0) { return res.status(404).send({ Msg: "ducument is not exist" }) }
        allData = allData.filter(x => x.authorId.toString() == authorIdFrom)

        if (allData.length == 0) {

            return res.status(401).send({ status: false, msg: "you are not authoris" })
        }
        req.query = query
        req.query.authorId = authorIdFrom.toString()

        next()
    }
    catch (err) {
        res.status(500).send({ catch: 1, msg: err })
    }
}
module.exports.delByQeury = delByQeury
//<=============================================== complete ==============================>




module.exports.authorVlidation = authorVlidation












//<=========================== we are Indian ============================================>