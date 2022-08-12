const userModel=require('../models/userModel')



const createUser=async function(req,res){
    let data=req.body
    let saveData=await userModel.create(data)
    res.send({msg:saveData})
   }


  const getUsersData=async function(req,res){
    let allUsers=await userModel.find()
    res.send({msg:allUsers})
}

   module.exports.createUser=createUser
   module.exports.getUsersData=getUsersData