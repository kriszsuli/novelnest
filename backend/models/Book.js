const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishDate: { type: Date, default: new Date(), required: false },
    publisher: { type: String, required: false },
    addedBy: { type: String, required: true },
    image: { type: String, required: false, default: "/assets/default-cover.png" },
    genre: { type: [String], default: [], required: false },
    summary: { type: String, default: "", required: false },
    isbn: { type: String, unique: true, required: false },
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

bookSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Book", bookSchema);
