const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publishercontroller=require("../controllers/publishercontroller")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )

router.get("/getAuthorsData", authorController.getAuthorsData)

router.post("/createBook", bookController.createBook  )

router.get("/getBooksData", bookController.getBooksData)

router.put("/books", bookController.getbooks)

router.post("/createpublisher",publishercontroller.createpublisher)

router.get("/getpublisherdata",publishercontroller.getpublisherdata)

module.exports = router;