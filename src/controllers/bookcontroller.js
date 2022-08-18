const modelBooks=require('../books/modelBooks.js')
const modelAuthor=require('../author/modelAuthor.js')


//problem 1xd
const createAuthor=async function(req,res){
  let data=req.body;
  let authorid=data.author_id
  if(!authorid){
    return res.send({status:false,msg:"author id is not present"})
  }
 
  let saveData=await modelAuthor.create(data);
  res.send({msg:saveData})
}
 
const book = async function (req, res) {
    let data = req.body
    let saveData = await modelBooks.create(data)
    res.send({ msg: saveData })
  } 
//problem 2
  const listofbook = async function (req, res) {
    let authorDetail = await modelAuthor.find({author_name:"Chetan Bhagat"});
    let authorid=authorDetail[0].author_id;
    let allBooks=await modelBooks.find({author_id:authorid}).select({name:1,_id:0})
     res.send({ msg: allBooks })
  
  } 

  //problem 3
  const newBookPrice=async function(req,res){
    let data=req.body
    const findbook=await modelBooks.find({name:"Two states"})
    const authorid=findbook[0].author_id
    const authorname=await modelAuthor.findOne({author_id:authorid}).select({author_name:1,_id:0})
    const bookname=findbook[0].name
    const updatedprice=await modelBooks.findOneAndUpdate({name:bookname} ,{$set:data},{new:true}).select({price:1,_id:0})
    res.send({msg:authorname,updatedprice})
  }
  
  // problem 4
  const pricebetween=async function(req,res){
    const findbook=await modelBooks.find({price:{$gte:50,$lte:100}}).select({author_id:1,_id:0})
    const id=findbook.map(x => x.author_id)
    let bag=[]
    for(i=0;i<id.length;i++){
      const findingAuthor=await modelAuthor.find({author_id:id[i]}).select({author_name:1,_id:0})
      bag.push(findingAuthor)
    }
    res.send({bag})
  }
  module.exports.createauthor=createAuthor
  module.exports.createbook = book
  module.exports.usersData=listofbook
  module.exports.updateprice=newBookPrice
  module.exports.findingprice=pricebetween
