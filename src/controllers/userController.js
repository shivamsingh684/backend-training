const userModel=require('../models/userModel')



const createnewbook=async function(req,res){
    let data=req.body
    let saveData=await userModel.create(data)
    res.send({msg:saveData})
   }


  const listofbook=async function(req,res){
   
    //let allBooks=await userModel

  //   let allUsers=await userModel.find({
  //     $or:[{authorName:" Barbara "},{isPublished:true},{"year":2002}]
  // }).select({ bookName:1,authorName:1,_id:0})
   // {authorName:" Barbara ",isPublished:true}
   //let allBooks=await userModel.find().sort({sales:-1})//sort

   //PAGINATION
  //let page=req.query.page
   //let allBooks=await userModel.find().skip(3*(page-1)).limit(3)
  // let allBooks=await userModel.find().sort({sales:-1}).skip(3*(page-1)).limit(3).select({authorName:1,bookName:1})


 //let allBooks=await userModel.find({authorName:{$eq:" Barbara "}})//equat to
 //let allBooks=await userModel.find({sales:{$gt:65}}) greater than
 //let allBooks=await userModel.find({sales:{$lt:65}}) less than
 //let allBooks=await userModel.find({sales:{$lte:65}})
 //let allBooks=await userModel.find({sales:{$gte:65}})
 //let allBooks=await userModel.find({sales:{$ne:137}})//not eqal to
 //let allBooks=await userModel.find({  $or:  [  {sales:{$eq:10}}  ,{sales:{$eq:70}} , {sales:{$eq:82}}  ]})
 //let allBooks=await userModel.find({ sales: {$in:[10,17,82] } }).count() presnt between these

 //let allBooks=await userModel.find({ sales: {$nin:[70,82,137] } }).select({sales:1,_id:0})//not between these
 //let allBooks=await userModel.find({ $and:[ {sales:{$gt:20}},{sales:{$lt:140}} ] })
 //let allBooks=await userModel.find({ sales :{$gt:20,$lt:140} })  //between these conditon value print
 //let allBooks=await userModel.findById("62fb71a76c5220d197d08dfb") 
 //let allBooks=await userModel.findOne({sales:10})

 //update|findByIdAndUpdate |updateOne|
//  let allBooks=await userModel.update(
//   {sales:{$gt:10}},
//   {$set:{isPublished:true}}
//  )
//let allBooks=await userModel.find({ bookName:/^Tar/ })  //REGEX    for starting letter
//let allBooks=await userModel.find({ bookName:/as$/ }) // for last leter 


 // let allBooks=await userModel.find({ bookName:/.* Monte.*/ }) // for middle letter
// ASYNC AWAIT

 let allBooks=await userModel.find()


 res.send({msg:allBooks}) 

}

   module.exports.createUser=createnewbook
   module.exports.getUsersData=listofbook 