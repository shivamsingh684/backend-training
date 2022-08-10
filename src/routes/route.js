const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')

const router = express.Router();
//problem player
let players=[
    {
        "name": "manish",
        "dob": "1/1/1995",
        "gender": "male",
        "city": "jalandhar",
        "sports": [
            "swimming"
        ]
    },
    {
        "name": "gopal",
        "dob": "1/09/1995",
        "gender": "male",
        "city": "delhi",
        "sports": [
            "soccer"
        ]
    },
    {
        "name": "lokesh",
        "dob": "1/1/1990",
        "gender": "male",
        "city": "mumbai",
        "sports": [
            "soccer"
        ]
    },
]
router.post('/players', function (req, res) {

   let newplayer=req.body
   let newname=newplayer.name
   let repeatedname=false;

   for(i=0;i<players.length;i++){
    if(players[i].name===newname){
       repeatedname=true;
       break;
    }
   }
   if(repeatedname){
    res.send("this name already exist")

   }
   else{
    players.push(newplayer)
    res.send(players)
   }

})
//=====================================================================
let myarrray=[23,45,67,28145,3654,485,44,56,12,48]
router.post('/allquery-2',function(req,res){

    let input=req.query.input
    let finalarray=myarrray.filter(ele => ele >input)

res.send({data:finalarray,status:true})
})

router.get('/test-me', function (req, res) {
    myHelper.printDate()
    myHelper.getCurrentMonth()
    myHelper.getCohortData()
    let firstElement = underscore.first(['Sabiha','Akash','Pritesh'])
    console.log('The first element received from underscope function is '+firstElement)
    res.send('My first ever api!')
    // res.send('my api is is  running')
});
router.post('/test-post',function(req,res){
    // let id=req.body.user
    // let pwd=req.body.password

    // console.log(id,pwd)

    console.log(req.body)
res.send({msg:"hi",status:true})

})
router.post('/test-post-2',function(req,res){
    let arr=[12,"functioup"]
    let ele=req.body.element
    arr.push(ele)
   
res.send({msg:arr,status:true})

})
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
    router.get("/shoes",function(req,res){
        let queryParams=req.query
        let brand =queryParams.brand
        res.send('dumy response')
    })

router.get('/hello', function (req, res) {
   
    res.send('Hello there!')
});
//problem 1
router.get("/sol1", function (req, res) {
    
    let arr= [1,2,3,5,6,7]
   
    let total =0;
    for(i=0;i<arr.length;i++){
        total=total+arr[i];//24
    }

    let lastdigit=arr.pop()
    let consecutive=lastdigit * (lastdigit+1)/2 //28
    let missingNumber=consecutive - total

console.log(missingNumber)

    res.send(  { data: missingNumber  }  );

 });
 //problem 2
    router.get("/sol2", function (req, res) {
    //logic : sum of n consecutive numbers is [ n * (first + last) / 2  ]..so get sum of all numbers in array. now take sum of n consecutive numbers.. n would be length+1 as 1 number is missing
    let arr= [33, 34, 35, 37, 38]
    let len=arr.length
    let total=0;
    for(i=0;i<arr.length;i++){
        total=total+arr[i] //117
    }
    let firstdigit=arr[0]
    let lastdigit=arr.pop()
    let consecutive=(len+1)*(firstdigit+lastdigit)/2 //213

    let missingNumber=consecutive-total //213-177=36

	   ///LOGIC WILL GO HERE 
  
       res.send(  { data: missingNumber  }  );
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