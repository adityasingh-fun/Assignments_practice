const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  let data = req.body;
  let savedData = await userModel.create(data);
  res.send({ status: true, msg: savedData });
};


const loginUser = async function (req, res) {
  let userId = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userId, password: password });
  if (!user) {
    return res.send({ status: false, msg: "Incorrect email Id or password" });
  }

  let token = jwt.sign(
    {
      userId: user._id.toString(),
      userName: user.firstName,
      random: "Hello functionUp"
    },
    "My secret key for token generation"
  );
  res.setHeader('x-auth-token', token);
  res.send({ status: true, token: token })

}


const getUserData = async function (req, res) {
  let userId = req.params.userId
  let user = await userModel.findById({ _id: userId });
  if (!user) {
    return res.send({ status: false, msg: "user does not exist" });
  }
  res.send({ status: true, msg: user })
}


const updateUser = async function (req, res) {
  let userId = req.params.userId;
  let user = await userModel.findById({ _id: userId });

  if (!user) {
    res.send({ status: false, msg: "User not found" });
  }

  let modifyData = req.body;
  let updatedUser = await userModel.findOneAndUpdate(
    { _id: userId },
    { $set: modifyData },
    { new: true }
  )
  res.send({ status: true, msg: updatedUser })

}


const deleteUser = async function (req, res) {
  // authentication and authorisation are done in middleware

  let userId = req.params.userId;
  let user = await userModel.findOne({ _id: userId });

  if (!user) {
    return res.send({ status: false, msg: "User does not exists" });
  }

  let deletedUser = await userModel.findOneAndUpdate(
    { _id: userId },
    { $set: { isDeleted: true } },
    { new: true }
  )
  res.send({ status: true, msg: deletedUser })
}


const postMessage = async function (req, res) {
  let userId = req.params.userId;
  let user = await userModel.findById({ _id: userId });

  if (!user) {
    return res.send({ status: false, msg: "user doesnot exist" });
  }
  let message = req.body.message;
  let array = user.posts;
  array.push(message)

  let updatedUser = await userModel.findOneAndUpdate(
    { _id: userId },
    { posts: array },
    { new: true }
  )

  res.send({ status: true, msg: updatedUser })
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.postMessage = postMessage
module.exports.deleteUser = deleteUser