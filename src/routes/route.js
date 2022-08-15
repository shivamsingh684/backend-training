const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')
//const UserModel=require('../models/userModel.js');
const userModel = require('../models/userModel.js');
const userControler=require('../controllers/userController')

const router = express.Router();
// const {default: mongoose}=require('mongoose')

router.get('/test-me', function (req, res) {
    myHelper.printDate()
    myHelper.getCurrentMonth()
    myHelper.getCohortData()
    let firstElement = underscore.first(['Sabiha','Akash','Pritesh'])
    console.log('The first element received from underscope function is '+firstElement)
    res.send('My first ever api!')
});

router.get('/hello', function (req, res) {
   
    res.send('Hello there!')
});

router.get('/candidates', function(req, res){
    console.log('Query paramters for this request are '+JSON.stringify(req.query))
    let gender = req.query.gender
    let state = req.query.state
    let district = req.query.district
    console.log('State is '+state)
    console.log('Gender is '+gender)
    console.log('District is '+district)
    let candidates = ['Akash','Suman']
    res.send(candidates)
})

router.get('/candidates/:canidatesName', function(req, res){
    console.log('The request objects is '+ JSON.stringify(req.params))
    console.log('Candidates name is '+req.params.canidatesName)
    res.send('Done')
})
// mongoose.connect("mongodb+srv://rahuldhek21:18248518@cluster0.190udme.mongodb.net/shivamsingh684",
// {
//  useNewUrlParser:true
// }
// ).then( ( )=> {console.log("MongoDb is connected")})
// .catch(err => console.log(err))

//=============================================================================== 

//router.post('/createuser',userControler.createUser)

router.post('/createnewbook',userControler.createUser)


//router.get('/getUserData',userControler.getUsersData)

router.get('/listofbook',userControler.getUsersData)

module.exports = router;
// adding this comment for no reason