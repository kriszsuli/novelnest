const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, async (req, res, next) => {
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
    Movie.paginate({},options,function(err,resp){
      res.json({
        movies: resp.docs.map(movie=>({
            title: movie.title,
            director: movie.director,
            releaseDate: movie.releaseDate,
            image: movie.image,
            genre: movie.genre,
            summary: movie.summary,
            imdbId: movie.imdbId,
            duration: movie.duration,
            rating: movie.rating,
            reviews: movie.reviews
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
    const newMovie = new Movie(req.body); //good enough for now
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/review", authMiddleware, async (req, res, next) => {
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
