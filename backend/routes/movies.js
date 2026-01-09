const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/review", async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const { userId, comment, rating } = req.body;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    movie.reviews.push({ userId, comment, rating });
    const updatedMovie = await movie.save();
    res.status(200).json(updatedMovie);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
