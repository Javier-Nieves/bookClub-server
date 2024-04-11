const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookid: {
    type: String,
    required: [true, "A book must have an ID"],
    unique: true,
  },
  club: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  title: {
    type: String,
    required: [true, "A book must have a title"],
    unique: true,
    trim: true,
    maxlength: [
      200,
      "A book title must have less or equal then 200 characters",
    ],
    minlength: [2, "A book title must have more or equal then 2 characters"],
  },
  author: {
    type: String,
    required: [true, "A book must have an author"],
  },
  country: {
    type: String,
    required: [true, "A book must have a country"],
    maxlength: [20, "A book country must have max 20 characters"],
    minlength: [2, "A book country must have more or equal then 2 characters"],
  },
  pages: {
    type: Number,
  },
  desc: {
    type: String,
    trim: true,
  },
  image_link: {
    type: String,
    maxlength: [400, "Image link must have max 400 characters"],
  },
  year: {
    type: Number,
    min: -10000,
    max: 10000,
  },
  read: { type: Boolean, default: false },
  upcoming: { type: Boolean, default: false },
  rating: {
    type: Number,
    min: 0,
    max: 10,
  },
  meeting_date: Date,
});

const book = mongoose.model("Book", bookSchema);

module.exports = book;
