const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const AuthorController =require("../controllers/authorController")
const BlogController= require("../controllers/blogController")
const authorValid=require("../validation/validation")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})




 router.post("/authors",authorValid.authorVlidation, AuthorController.createAuthor  )
router.post("/blogs",BlogController.createblog)
router.get("/getblogs",BlogController.getBlog)
router.put("/blogs/:blogId",BlogController.updateBlog)
router.delete("/deleteBlogs/:blogId",BlogController.deletedBlog)
router.delete("/blogs",BlogController.deleteByQuery)

module.exports = router;