

   const mongoose = require('mongoose');
   const ObjectId = mongoose.Schema.Types.ObjectId
   const BlogSchema = new mongoose.Schema( {
       title :String,
        authorId:{
           type : ObjectId,
           ref: 'Author',
           required :true},
           tags : [String],
           category :{
               type: [String],
           required:true},
           subcategory:[String],
           type: String,
           publishedAt: {
               type : Date    
           },
        deletedAt: {type:Date}, 
     isPublished:{type:Boolean,default:false},
     isDeleted:{type:Boolean,default:false}
   }, { timestamps: true });
   
   module.exports = mongoose.model('Blog', BlogSchema)




