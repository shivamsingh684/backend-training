const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel=require("../models/publisherModel")

const createBook= async function (req, res) {
    let data = req.body
    let author=data.author
    //console.log(author)
    let publisher=data.publisher
    if(!author || !publisher){
      return res.send({status:false,msg:"author Id or publisher Id is not prsent"})
    }
    
    let idauthor=await authorModel.findById(author)
    let idpublisher=await publisherModel.findById(publisher)
   
    if(idauthor && idpublisher ){
      let bookCreated = await bookModel.create(data)
      console.log(idauthor,idpublisher)
     return res.send({data: bookCreated,status:true,msg:"author id or publisher id matched"})
    }
    else{
      return res.send({msg:"author id and publisher id is not matched"})
    }

   
}
//problem 4

const getBooksData= async function (req, res) {
    let books = await bookModel.find().populate('author publisher')
    res.send({data: books})
}

//problem 5
const getBooks = async function (req, res) {
 
  let data2=req.body
  let data=await publisherModel.find({name:{$in:["HarperCollins","Penguin"]}}).select({_id:1})
  let updateprice=await authorModel.find({rating:{$gt:3.5}}).select({_id:1})
 //console.log(updateprice)
 //console.log(data)
    let specificBook = await bookModel.update({publisher:{$in:data}},
      {$set:data2},
    
       {new:true}
    )
   
    let newprice=await bookModel.update({author:{$in:updateprice}},{$inc:{price:10}})
  
    res.send({data: specificBook,newprice})
 
}  


module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getbooks = getBooks
