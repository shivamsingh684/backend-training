const express = require('express');
const abc = require('../introduction/intro')
const newname=require('../logger/logger.js')
const router = express.Router();
const new2=require('../util/helper.js')
const new3=require('../validator/formatter.js')

router.get('/test-me', function (req, res) {
    // console.log('My batch is', abc.name)
    //  console.log(newname.name2)
     
    // abc.printName()
    // newname.funct1()
    newname.welcome
    new2.today
    new3.x1
 
    res.send('My second ever api!')
});


router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason