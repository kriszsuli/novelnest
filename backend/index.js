const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend listening on :${PORT}`);
});