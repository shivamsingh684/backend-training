const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const AuthorController =require("../controllers/authorController")
const BlogController= require("../controllers/blogController")
const authorValid=require("../validation/validation")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})




 router.post("/createAuthor",authorValid.authorVlidation, AuthorController.createAuthor  )
router.post("/createblog",BlogController.createblog)
router.get("/getBlog",BlogController.getBlog)
router.put("/blogs/:blogId",BlogController.updateBlog)
router.delete("/delete/:blogId",BlogController.deletedBlog)
router.delete("/delete",BlogController.deleteByQuery)

module.exports = router;