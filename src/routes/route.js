const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const middleware = require('../middleware/auth.js')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId", middleware.authenticate, middleware.authorise, userController.getUserData)

router.post("/users/:userId/posts", middleware.authenticate, middleware.authorise, userController.postMessage)

router.put("/users/:userId", middleware.authenticate, middleware.authorise, userController.updateUser)

router.put('/delete/:userId', middleware.authenticate, middleware.authorise, userController.deleteUser)

module.exports = router;