//const mongoose=require('mongoose');
// const userSchema=new mongoose.Schema({
//     firstName:String,
//     lastName:String,
//     mobile:{
//         type:String,
//         unique:true,
//         required:true
//     },
//     emailId:String,
//     gender:{
//         type:String,
//         enum:["male","female","LGBTQ"]
//     },
//     age:Number
// }, {timestamps:true});

// module.exports=mongoose.model('User',userSchema)















const mongoose=require('mongoose');



const bookSchema=new mongoose.Schema({
    bookName:String,
    authorName:String, 
    // category:{
    //     type:String,
    //    enum:["comic","adventure","action","classics","historical"]
         
    // },
    year:Number ,
    tags:[String],
    date:{
        type:Date,
        default:Date.now
    },
    isPublished:Boolean,
    prices:{
        indianPrice:String,
        euroPrice:String
    },
    sales:{type:Number,default:10}
},{timestamps:true});
module.exports=mongoose.model('User',bookSchema)                                                                              
