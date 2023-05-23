const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: {
        type: String,
        required:true
    },
    price:{
        indianPrice: String,
        europeanPrice: String
    },
    year: Number,
    tags: [String],
    authorName: String,
    totalPages: Number,
    stockAvailable: Boolean

    // bookName: String, 
    // authorName: String, 
    // tags: [String],
    
    // isPublished: Boolean,
    // prices: {
    //     indianPrice: String,
    //     europePrice: String,
    // },
    // sales: {type: Number, default: 10}
}, { timestamps: true });


module.exports = mongoose.model('Book3', bookSchema) //users

//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover
