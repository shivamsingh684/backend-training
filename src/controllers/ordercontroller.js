const orderModel = require("../models/ordermodel")
const productModel=require("../models/productmodel")
const userModel=require("../models/userModel")

const createOrder=async function(req,res){
    let data=req.body
    let FreeAppUser=req.headers.freeapp
    let finduser=await userModel.findById({_id:data.userId})
    if(!finduser) return res.send({status:false,msg:"userId is invalid"})
    let findproduct=await productModel.findById({_id:data.productId})
    if(!findproduct)return res.send({status:false,msg:"productId is invalid"})


    if(!FreeAppUser){
        if(finduser.balance >= data.amount){
            let ordercreate=await orderModel.create(data)
            let update=await userModel.updateOne({_id:finduser},{$inc:{balance:-data.amount}}) 
            let update2=await userModel.updateOne({_id:finduser},{$set:{isFreeAppUser:FreeAppUser}})
            return res.send({msg:ordercreate})
        }
        else if(finduser.balance <= data.amount)
        {
            return res.send({status:true,msg:"the user does not have enough balance"})
        }
    }
        else if(FreeAppUser)
        {
            let ordercreate=await orderModel.create(data)
            let update =await orderModel.updateOne({_id:ordercreate._id},{$set:{amount:0}})
            let update2 =await userModel.updateOne({_id:finduser._id},{$set:{isFreeAppUser:FreeAppUser}})
            return res.send({data:ordercreate})
        }
    
}

module.exports.createOrder=createOrder