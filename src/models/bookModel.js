const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName: String,
    authorName: String,
    category: String,
    year: Number
},{timestamp:true});

module.exports = mongoose.model("Books",bookSchema)