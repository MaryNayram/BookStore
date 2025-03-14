const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  summary: { type: String, required: true },
  image: { type: String, required: true },
  publishedDate: { type: String, required: true },
  category: { 
    type: String,
    required: true,
    enum: ["genres", "discover"]
  },
  specificType: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
