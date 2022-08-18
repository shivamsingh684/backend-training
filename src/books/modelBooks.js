const mongoose=require('mongoose');


const book=new mongoose.Schema({
    name:{type:String,required:true},
    author_id:Number,
    price:Number,
    rating:Number
},{timestamps:true});
module.exports=mongoose.model('User',book)   