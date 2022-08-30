const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
  try{
  let data = req.body;
  if(Object.keys(data).length !=0){
    let savedData = await userModel.create(data);
    //console.log(abcd.newAtribute);
    res.status(201).send({ msg: savedData });
  }
  else res.status(400).send({msg:"BAD REQUEST"})

  }
  catch(err){
    console.log("this is error:",err.message)
    res.status(500).send({msg:"Error",error:err.message}) 
  }
};

const loginUser = async function (req, res) {
  try{
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.status(403).send({
      status: false,
      msg: "username or the password is not corerct",
    });


  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "thorium",
      organisation: "FUnctionUp",
    },
    "functionup-thorium"
  );
  res.setHeader("x-auth-token", token);
  res.status(201).send({ status: true, data: token });
  }
  catch(err){
    res.status(500).send({error:err.message})
  }
};

const getUserData = async function (req, res) {
  try{
 
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
  return res.status(404).send({ status: false, msg: "No such user exists" });

  res.status(200).send({ status: true, data: userDetails });
  }
  catch(err){
     res.status(500).send({error:err.message})
  }
};

const updateUser = async function (req, res) { 

try{
  let userId = req.params.userId;
  //console.log(userId)
  let user = await userModel.findById(userId);
  
  if (!user) {
    return res.status(404).send("No such user exists");
  }
  
  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
  res.status(200).send({ status: updatedUser, data: updatedUser });
}
catch(err){
  res.status(500)({error:err.message})
}
};

const postMessage = async function (req, res) {
    let message = req.body.message
   
    

    let user = await userModel.findById(req.params.userId)
    if(!user) return res.status(404).send({status: false, msg: 'No such user exists'})
    
    let updatedPosts = user.posts
    //add the message to user's posts
    updatedPosts.push(message)
    let updatedUser = await userModel.findOneAndUpdate({_id: user._id},{posts: updatedPosts}, {new: true})

    //return the updated user document
    return res.status(201).send({status: true, data: updatedUser})
}
 
module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.postMessage = postMessage
