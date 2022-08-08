const express = require('express');
const _ = require('underscore')

const abc = require('../introduction/intro')
const loggerModule = require('../logger/logger.js')
const formatterModule = require('../validator/formatter') 
const helperModule = require('../util/helper')
const load=require('../lodash/file')
const arrfunc=require('../lodash/file2')
const manyarray=require('../lodash/file3')
const pairs=require('../lodash/file4')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    loggerModule.printInfo()
    formatterModule.trimMyString()
    formatterModule.getUpperCaseString()
    formatterModule.changetoLowerCase()
    helperModule.getTodaysDate()
    helperModule.getCurrentMonth()
    helperModule.printBatchDetails()
    load.lodash()
    arrfunc.arr1()
    manyarray.manyarr()
    pairs.newlist()
    let weekdend = ['Saturday','Sunday','Monday']
    let result = _.first(weekdend, 2)
    console.log('Unserscore example resultr is ',result)
    res.send('My second ever api!')
});
router.get('/student-details/:name',function(req,res){
    console.log("This is the request"+JSON.stringify(req.params))
    let reqParams=req.params
    let studentName=reqParams.name
    console.log('Name of the student ',studentName)
    let studentDetail=studentName+" "+studentName
    res.send(studentDetail)
})

router.get('/cohort-members',function(req,res){
    let student=['sdfg','dfggg','dffgg']
    res.send(student)
})


router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason