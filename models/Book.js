const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  bookID: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Currently Reading", "Read", "Wishlist"]
  },
  cover: {
    type: String
  },
  authors: [
    {
      type: String,
      required: true
    }
  ],
  userId: String
});

module.exports = mongoose.model("Book", BookSchema);
