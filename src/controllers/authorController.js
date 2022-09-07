
const AuthorModel = require("../models/authorModel")
const jwt=require("jsonwebtoken")
const createAuthor= async function (req, res) {
    try{
        let data= req.body
    
        
    let savedData= await AuthorModel.create(data)
    return res.status(201).send({msg: savedData})
    }
    catch(err){
    return res.status(500).send({msg:err.message})
    }
}
module.exports.createAuthor = createAuthor


//<========================================= authorLogin ================================>
  
  const authorLogin=async function (req,res){
         try {
            let email=req.body.email
            let password=req.body.password
            // const data=req.body
            // let {userName,password}=data
            if(!email)return res.status(404).send({status:false,msg:"please provide userName"})
            if(!password)return res.status(404).send({status:false,msg:"please provide password"})
            if(email&& password){
              const user=await AuthorModel.findOne({email:email,password:password})
              if(!user)return res.status(404).send({status:false,msg:"email or password is incorrect"})
              
              let token=jwt.sign({
                  authorId:user._id.toString(),
                  batch:"plutonium",
                  organization:"functionUp",
  
              },
               "FirstProject"
              )
              return res.setHeader("x-api-key",token)
              return res.status(200).send({status:true,token:token})
            }else{
                res.status(401).send({msg:"username or password required"})
            }
  
            
         } catch (error) {
            return res.status(500).send({error:error})
         }
  }
module.exports.authorLogin=authorLogin