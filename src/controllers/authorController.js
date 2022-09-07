
const AuthorModel = require("../models/authorModel")
const jwt=require("jsonwebtoken")
const createAuthor= async function (req, res) {
    try{
        let data= req.body
    
        
    let savedData= await AuthorModel.create(data)
    res.status(201).send({msg: savedData})
    }
    catch(err){
        res.status(500).send({msg:err.message})
    }
}
module.exports.createAuthor = createAuthor


//<========================================= authorLogin ================================>
  
  const authorLogin=async function (req,res){
         try {
            const data=req.body
            let {userName,password}=data
            if(!userName)return res.status(404).send({status:false,msg:"please provide userName"})
            if(!password)return res.status(404).send({status:false,msg:"please provide password"})
            if(userName && password){
              const user=await AuthorModel.find({email:userName,password:password})
              if(!user)return res.status(404).send({status:false,msg:"email or password is incorrect"})
              
              let token=jwt.sign({
                  authorId:user._id.toString(),
                  batch:"plutonium",
                  organization:"functionUp",
  
              },
               "FirstProject"
              )
              res.setHeader("x-api-key",token)
              res.status(200).send({status:true,token:token})
            }else{
                res.status(401).send({msg:"username or password required"})
            }
  
            
         } catch (error) {
            res.status(500).send({error:error})
         }
  }
module.exports.authorLogin=authorLogin