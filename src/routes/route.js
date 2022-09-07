const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const AuthorController =require("../controllers/authorController")
const BlogController= require("../controllers/blogController")
const authorValid=require("../validation/validation")
const middleware=require("../middlewares/commonMiddlewares")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})




router.post("/authors",authorValid.authorVlidation,AuthorController.createAuthor)

router.post("/blogs",middleware.authentication,BlogController.createblog)

router.get("/getblogs",authorValid.mid2,middleware.authorization,BlogController.getBlog)//done

router.put("/blogs/:blogId",authorValid.mid3,BlogController.updateBlog)

router.delete("/deleteBlogs/:blogId",authorValid.mid3,BlogController.deletedBlog)

router.delete("/blogs",authorValid.mid4,BlogController.deleteByQuery)

router.post("/authorlogin",AuthorController.authorLogin)



module.exports = router;