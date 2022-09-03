let axios = require("axios")

let getsorteddata=async function(req,res){
try{
let cities=  ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"] 
let sortdata=[]
for(i=0;i<cities.length;i++){
 let obj={city:cities[i]}
 let resp=await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=9459c0c4c60f5021ed6482de800a8bb7`)
 //console.log(resp.data.main.temp)
 obj.temp=(resp.data.main.temp)
 obj.temp=resp.data.main.temp
 sortdata.push(obj)  
}
let sorted=sortdata.sort(function(a,b){return a.temp -b.temp})
//console.log(sorted)
res.status(200).send({status:true,data:sorted})
}
catch(err){
    console.log(err)
    res.status(500).send({status:false,msg:err.message})
}
}

let memehandler =async function(req,res){
    try{
        let template_id=req.query.template_id
        let text0=req.query.text0
        let text1=req.query.text1
        let username=req.query.username
        let password=req.query.password
        let options={
            method:"post",
            url:`https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`
        }
        let result=await axios(options)
        res.send({data:result.data})
    }
    catch(err){
        console.log(err)
        res.status(500).send({status:false,msg:err.message})
    }
}
module.exports.getsorteddata=getsorteddata
module.exports.memehandler=memehandler