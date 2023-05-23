const BookModel= require("../models/bookModel")

const createBook = async function(req,res){
    let data = req.body;
    let savedData = await BookModel.create(data);
    res.send({status:true,mgg:savedData})
}

const booksAndAuthors = async function(req,res){
    let fetchData = await BookModel.find().select({bookName:1,authorName:1,_id:0});
    res.send({status:true,msg:fetchData})
}

const getBooksInyear = async function(req,res){
    let yearFromReq = req.body.year
    let bookData = await BookModel.find({year:yearFromReq});
    res.send({status:true,msg:bookData});
}

const getPriceBooks = async function(req,res){
    let data = await BookModel.find({'price.indianPrice': {$in: ["Rs 100","Rs 200","Rs 500"]}}).select({'price.indianPrice':1,_id:0});
    console.log(data);
    res.send({status:true,msg:data});
}

const getRandomBooks = async function(req,res){
    let data = await BookModel.find({
        $or: [{stockAvailable:false},{totalPages: {$gt: 300}}]
    })
    console.log(data);
    res.send({status:true,msg:data});
}

const getParticularBooks = async function(req,res){
    let data = req.body;
    let books = await BookModel.find({
        $or: [{bookName:req.body.bookName},{year:req.body.year}]
    });
    res.send({status:true,msg:books})
}

const getBooksData= async function (req, res) {
    let allBooks= await BookModel.find(  { authorName : "SK" , isPublished: true }  )
    res.send({msg: allBooks})
}

module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.booksAndAuthors= booksAndAuthors
module.exports.getBooksInyear= getBooksInyear
module.exports.getPriceBooks= getPriceBooks
module.exports.getRandomBooks= getRandomBooks
module.exports.getParticularBooks= getParticularBooks