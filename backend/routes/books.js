const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", async (req, res, next) => {
  try {
    if(req.query.page && (isNaN(req.query.page) || req.query.page > 0x7FFFFFFF || req.query.page < 1)) {
      return res.status(400).json({
        message: "bad request", error: 400
      });
    };
    const options = {
      page: req.query.page ? req.query.page : 1,
      limit: 10
    }
    Book.paginate({},options,function(err,resp){
      res.json({
        books: resp.docs.map(book=>({
            title: book.title,
            author: book.author,
            publishDate: book.publishDate,
            publisher: book.publisher,
            image: book.image,
            genre: book.genre,
            summary: book.summary,
            isbn: book.isbn,
            pages: book.pages,
            rating: book.rating,
            reviews: book.reviews
        })),
        page: resp.page,
        totalPages: resp.totalPages,
        limit: resp.limit
      });
    })
  } catch (err) {
    next(err);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/review", authMiddleware, async (req, res, next) => {
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
