const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

router.get("/", async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/review", async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const { userId, comment, rating } = req.body;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    book.reviews.push({ userId, comment, rating });
    const updatedBook = await book.save();
    res.status(200).json(updatedBook);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
