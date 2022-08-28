const UserModel= require("../models/userModel")

const createUser= async function (req, res) {
    
    let data= req.body
    let data2=req.headers.freeapp
    data.isFreeAppUser=data2
    let allusers=await UserModel.create(data)
   // let update=await UserModel.updateOne({name:createUser.name},{$set:{isFreeAppUser:data2}})
    res.send({msg:allusers})
}

const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}

module.exports.createUser= createUser
module.exports.getUsersData= getUsersData
