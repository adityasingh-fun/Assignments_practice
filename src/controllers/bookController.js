const bookModel= require("../models/bookModel")

const createBook = async function(req,res){
    let data = req.body;
    let savedData = await bookModel.create(data);
    res.send({msg:"Book Created", CreatedBook:savedData})
}

const getBook = async function(req,res){
    let data = await bookModel.find();
    res.send({msg:"The books in the Database are listed below",books:data})
}

module.exports.createBook = createBook;
module.exports.getBook = getBook;
