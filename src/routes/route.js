const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")

router.post('/users',userController.createUser)

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId", userController.getUserData)

router.put("/users/:userId", userController.updateUser)

router.put('/delete/:userId',userController.deleteUser)

module.exports = router;