const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const AuthorController =require("../controllers/authorController")
const BlogController= require("../controllers/blogController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})




router.post("/createAuthor", AuthorController.createAuthor  )
router.post("/createblog",BlogController.createblog)

module.exports = router;