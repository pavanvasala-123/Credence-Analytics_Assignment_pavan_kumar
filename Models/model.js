const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    "name":String,
    "img":String,
    "summary":String
},{ timestamps: true})

const Book = mongoose.model('Book',bookSchema);

module.exports = Book;

