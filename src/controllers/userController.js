const userModel = require('../models/userModel')

//CREATE A NEW BOOK

const createnewbook = async function (req, res) {
  let data = req.body
  let saveData = await userModel.create(data)
  res.send({ msg: saveData })
}
 
//SEE LIST OF ALL BOOKS
const listofbook = async function (req, res) {
  let allBooks = await userModel.find().select({bookName:1,authorName:1,_id:0})


  res.send({ msg: allBooks })

}


// SEE YEAR 


// const listofbook = async function (req, res) {
//   let getBookInYear= await userModel.find({"year":2010}).select({ bookName:1,year:1,_id:0})


//   res.send({ msg: getBookInYear })

// }


// GET PARTICULAR BOOK BY BOOKNAME AND YEAR


// const listofbook = async function (req, res) {
//   let getParticularBooks= await userModel.find({$or:[{bookName:"The Hobbit"},{year:2007}]})


//   res.send({ msg: getParticularBooks })

// }

// GET INDIAN BOOK

// const listofbook = async function (req, res) {
  
//   let getXINRBooks= await userModel.find( {$or:[{"prices.indianPrice":"500INR"},{"prices.indianPrice":"100INR"},{"prices.indianPrice":"200INR"}]})

//   res.send({ msg: getXINRBooks })


// }

// const listofbook = async function (req, res) {
//   let getRandomBooks= await userModel.find({ stockAvailable:true,totalPages:{$gt:300}})


//   res.send({ msg: getRandomBooks })


// }






 






















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



module.exports.createUser = createnewbook
module.exports.getUsersData = listofbook 