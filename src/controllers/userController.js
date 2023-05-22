const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

/*
  Read all the comments multiple times to understand why we are doing what we are doing in login api and getUserData api
*/

const createUser = async function (req, res) {
  let data = req.body;
  let savedData = await userModel.create(data);
  res.send({ status: true, msg: savedData });
}

const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user) {
    return res.send({ status: false, msg: "Incorrect userId or password" });
  }

  let token = jwt.sign(
    {
      userId: user._id,
      userName: user.firstName,
      new_name: "Addy Bhaiya",
      college: "VIT University"
    },
    "This is my very very secret key"
  )

  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token })
}

const getUserData = async function (req, res) {
  let token = req.headers['x-auth-token'];
  if(!token){
    return res.send({status:false,msg:"Token must be present"});
  }

  let decodedToken = jwt.verify(token,"This is my very very secret key");
  if(!decodedToken){
    return res.send({status:false,msg:"Token is incorret"});
  }
  
  let userId = req.params.userId;
  let user = await userModel.findById({_id:userId});

  if(!user){
    return res.send({status:false,msg:"No such user exists"})
  }

  res.send({status:true,msg:user})
}

let updateUser = async function (req,res){
  let token = req.headers['x-auth-token'];
  if(!token){
    return res.send({status:true, msg:"Token must be present"});
  }

  let decodedToken = jwt.verify(token,"This is my very very secret key");
  if(!decodedToken){
    return res.send({status:false, msg:"Invaid token"});
  }

  let userId = req.params.userId;
  let user = await userModel.findById({_id:userId});
  if(!user){
    return res.send({staus:false,msg:"User does not exist"})
  }

  let userdetails = req.body;

  let updateUser = await userModel.findOneAndUpdate(
    {_id:userId},
    {$set : userdetails},
    {new:true}
  )
  res.send({status:true,msg:updateUser})
}


const deleteUser = async function(req,res){
  let token = req.headers['x-auth-token'];
  if(!token){
    return res.send({status:false,msg:"Token must be present"});
  }

  let decodeToken = jwt.verify(token,"This is my very very secret key");
  if(!decodeToken){
    return res.send({status:false,msg:"Invalid Token"});
  }

  let userId = req.params.userId;
  let user = await userModel.findById({_id:userId});
  if(!user){
    return res.send({status:false,msg:"User does not exist"});
  }

  let deleteUser = await userModel.findOneAndUpdate(
    {_id:userId},
    {$set: {isDeleted:true}},
    {new: true}
  )
  res.send({status:true,msg:deleteUser})
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;