const Book = require("../models/bookModel");
const User = require("../models/userModel");

exports.getEverything = async function (req, res) {
  const books = await Book.find();
  res.status(200).json({ status: "success", data: { books } });
};

exports.getAll = async function (req, res) {
  const club = await User.findById(req.params.userId);
  const books = await Book.find({ club });
  res.status(200).json({ status: "success", data: { books } });
};

exports.createBook = async function (req, res) {
  const club = await User.findById(req.body.club);
  const newBookObject = { ...req.body, club };
  const newBook = await Book.create(newBookObject);
  res.status(200).json({ status: "success", data: { newBook } });
};

exports.changeBook = async function (req, res) {
  try {
    // prettier-ignore
    const book = await Book.findOneAndUpdate({ bookid: req.params.id }, req.body, {
      new: true,
    });
    res.status(202).json({ status: "success", data: { book } });
  } catch {
    res.status(304).json({ status: "fail", message: "Failed to update book" });
  }
};
