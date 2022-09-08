const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const AuthorController =require("../controllers/authorController")
const BlogController= require("../controllers/blogController")
const authorValid=require("../validation/validation")
const auth=require("../authentication/authentication")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})




router.post("/authors",authorValid.authorVlidation,AuthorController.createAuthor)

router.post("/blogs",auth.authentication,BlogController.createblog)

router.get("/getblogs",auth.authentication,BlogController.getBlog)

router.put("/update/:blogId",authorValid.mid3,auth.authentication,auth.authorization,BlogController.updateBlog) 

router.delete("/deleteBlogs/:blogId",authorValid.mid3,auth.authentication,auth.authorization,BlogController.deletedBlog)

router.delete("/deleteBlogsByQuery",authorValid.mid4,auth.authentication,auth.authorization,BlogController.deleteByQuery)

router.post("/authorlogin",AuthorController.authorLogin)



module.exports = router;