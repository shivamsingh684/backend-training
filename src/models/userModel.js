const mongoose=require('mongoose');



const bookcollection=new mongoose.Schema({
    bookName:{type:String,required:true},
    authorName:String, 
    totalPages:Number,
    year:{type:Number,default:2021 },
    tags:[String],
    stockAvailable:Boolean,
    prices:{
        indianPrice:String,
        euroPrice:String
    },
  
},{timestamps:true});
module.exports=mongoose.model('User',bookcollection)                                                                              
