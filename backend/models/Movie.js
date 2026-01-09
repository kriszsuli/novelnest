const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema(
  {
    title: { type: String, required: true },
    director: { type: String, required: true },
    releaseDate: { type: Date, default: new Date(), required: false },
    addedBy: { type: String, required: true },
    genre: { type: [String], default: [], required: false },
    summary: { type: String, default: "", required: false },
    imdbId: { type: String, unique: true, required: false },
    duration: { type: Number, required: false, default: 0 }, // perc
    rating: { type: Number, min: 0, max: 10, default: 0 },
    reviews: [
      {
        userId: { type: String, required: true },
        comment: { type: String },
        rating: { type: Number, min: 0, max: 10, required: true },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Movie", movieSchema);
