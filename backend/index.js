const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const booksRouter = require("./routes/books");
const authRouter = require("./routes/auth");

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

function authToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "Access denied." });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied." });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token." });
    req.user = user;
    next();
  });
}

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/api/books", booksRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.json({
    message: "ok",
    version: process.env.VERSION || "unreported",
  });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "not found", error: 404 });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "internal server error", error: 500 });
});

app.listen(PORT, () => {
  console.log(`Backend listening on :${PORT}`);
});
