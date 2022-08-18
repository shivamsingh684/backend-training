const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')

//const userModel = require('../models/userModel.js');
//const userControler=require('../controllers/userController')
const modelBooks=require('../books/modelBooks.js')
const modelAuthor=require('../author/modelAuthor.js')
const bookcontroler=require('../controllers/bookcontroller')


const router = express.Router();


// router.get('/test-me', function (req, res) {
//     myHelper.printDate()
//     myHelper.getCurrentMonth()
//     myHelper.getCohortData()
//     let firstElement = underscore.first(['Sabiha','Akash','Pritesh'])
//     console.log('The first element received from underscope function is '+firstElement)
//     res.send('My first ever api!')
// });

// router.get('/hello', function (req, res) {
    
//     res.send('Hello there!')
// });

// router.get('/candidates', function(req, res){
//     console.log('Query paramters for this request are '+JSON.stringify(req.query))
//     let gender = req.query.gender
//     let state = req.query.state
//     let district = req.query.district
//     console.log('State is '+state)
//     console.log('Gender is '+gender)
//     console.log('District is '+district)
//     let candidates = ['Akash','Suman']
//     res.send(candidates)
// })

// router.get('/candidates/:canidatesName', function(req, res){
//     console.log('The request objects is '+ JSON.stringify(req.params))
//     console.log('Candidates name is '+req.params.canidatesName)
//     res.send('Done')
// })
//router.post('/createuser',userControler.createUser)

router.post('/books',bookcontroler.createbook)
router.get('/bookslist',bookcontroler.usersData)

router.post('/author',bookcontroler.createauthor)

router.get('/newupdatedprice',bookcontroler.updateprice)

router.get('/findingprice',bookcontroler.findingprice)





//router.post('/createbook',userControler.createUser)
//router.get('/getUserData',userControler.getUsersData)
//router.get('/bookList',userControler.getUsersData)
//router.post('/updatebooks',userControler.updatebooks)
//router.post('/deletebooks',userControler.deletebooks)
//const moment=require('moment');
//router.post('/dateManupulation',function(req,res){
//     const today=moment();
//     console.log(today.format('DD-MM-YY'));
//     let validOrNot=moment("15-03-1990","DD-MM-YYYY").isValid()
//     console.log(validOrNot)
//     res.send({msg:"all good"})  
// })
// adding this comment for no reason
module.exports = router;