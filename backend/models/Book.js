const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, default: new Date(), required: false },
    addedBy: { type: String, required: true },
    genre: { type: [String], default: [], required: false },
    summary: { type: String, default: "", required: false },
    iban: { type: String, unique: true, required: false },
    pages: { type: Number, required: false, default: 0 },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviews: [
      {
        userId: { type: String, required: true },
        comment: { type: String },
        rating: { type: Number, min: 0, max: 5, required: true },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Book", bookSchema);
