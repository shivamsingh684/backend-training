const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
//createUser-
const createUser = async (req, res) => {
  let data = req.body;
  let savedData = await userModel.create(data);
  res.send({ msg: savedData });
};
//loginUser
const loginUser = async (req, res) => {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });

  let token = jwt.sign(
    {
      userId: user._id.toString(),
      place: "lucknow",
    },
    "shivam singh"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token }); 
};
//getUser
const getUserData = async (req, res) => {
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  res.send({ status: true, data: userDetails });
};
//updateUser
const updateUser = async (req, res) => {
  // let token = req.headers["x-Auth-token"];
  // if (!token) token = req.headers["x-auth-token"];
  // if (!token) return res.send({ status: false, msg: "token must be present" });
  // let decodedToken = jwt.verify(token, "shivam singh");
  // if (!decodedToken) return res.send({ status: false, msg: "token is invalid" });

  // let userId = req.params.userId;
  // let userloggedin=decodedToken.userId
  // if(userId!=userloggedin) return res.send({status:false,msg:"not a loggedin user"})
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) {
    return res.send("No such user exists");
  }
  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
  res.send({ data: updatedUser });
};
//deleteUser
const deleteUser = async (req, res) => {
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) {
    return res.send("No such user exists");
  }
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { $set: { isDeleted: true } }, { new: true });
  res.send({ data: updatedUser });
};

module.exports = { createUser, loginUser, getUserData, updateUser, deleteUser }

