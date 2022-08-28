const productModel=require("../models/productmodel")


const createProduct=async function(req,res){
    let data =req.body
    let productcreate=await productModel.create(data)
    res.send({msg:productcreate})
}

module.exports.createProduct=createProduct