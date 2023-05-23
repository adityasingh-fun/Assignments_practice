const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", UserController.createUser  )

router.get('/booksAndAuthors',BookController.booksAndAuthors)

router.post('/getBooksInyear',BookController.getBooksInyear)

router.get('/getPriceBooks',BookController.getPriceBooks)

router.get('/getRandomBooks',BookController.getRandomBooks)

router.post('/getParticularBooks',BookController.getParticularBooks)

router.get("/getUsersData", UserController.getUsersData)

router.post("/createBook", BookController.createBook  )

router.get("/getBooksData", BookController.getBooksData)

module.exports = router;