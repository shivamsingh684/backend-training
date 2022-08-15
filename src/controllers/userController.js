const userModel=require('../models/userModel')



const createnewbook=async function(req,res){
    let data=req.body
    let saveData=await userModel.create(data)
    res.send({msg:saveData})
   }


  const listofbook=async function(req,res){
    let allUsers=await userModel.find()
 
  res.send({msg:allUsers}) 
 }

   module.exports.createUser=createnewbook
   module.exports.getUsersData=listofbook