const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');

const booksRouter = require('./routes/books');

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.use("/api/books", booksRouter);

app.get('/', (req, res) => {
    res.json({
        message: 'ok',
        version: process.env.VERSION || 'unreported',
    });
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'not found', error: 404 });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'internal server error', error: 500 });
});

app.listen(PORT, () => {
    console.log(`Backend listening on :${PORT}`);
});