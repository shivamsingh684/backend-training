const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')

const router = express.Router();

router.get('/test-me', function (req, res) {
    myHelper.printDate()
    myHelper.getCurrentMonth()
    myHelper.getCohortData()
    let firstElement = underscore.first(['Sabiha','Akash','Pritesh'])
    console.log('The first element received from underscope function is '+firstElement)
    res.send('My first ever api!')
});
router.get("/movies",function(req,res){
    const movies=["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    //console.log(movies[i])
    res.send(movies)
})
router.get("/movies/:indexNumber",function(req,res){
    const movies=["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    console.log(req.params.indexNumber)
    let movieIndex=req.params.indexNumber
    //index
    if(movieIndex<0 || movieIndex>=movies.length){
       return res.send('the index value is not correct')
    }

    //let moviesIndex=req.params.indexNumber
    let requiredMovie=movies[movieIndex]

    res.send(requiredMovie)

})
router.get("/films",function(req,res){
    const films=[ {
        "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name": "Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]
       res.send(films)
})
router.get("/films/:filmId",function(req,res){
    const film1=[ {
        "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name": "Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]
       let filmId= req.params.filmId

       for(let i=0;i<film1.length;i++){
        let film=film1[i]
        if(film.id==filmId){
            return res.send(film)
        }
       }
       res.send("the film id does not match any movie")
    //    console.log('filmid recived',fimId)
    //    res.send('dummy response')
    })

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


module.exports = router;
// adding this comment for no reason