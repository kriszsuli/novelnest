const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

class Review {
    constructor(name, rating, book) {
        this.name = name
        this.rating = rating
        this.book = book
    }
}

var database = [
    new Review("Skibidi Pista", 9.6, "Rézműves Batu legendája"),
    new Review("Skibidi Pista", 9.6, "Rézműves Batu legendája"),
    new Review("Skibidi Pista", 9.6, "Rézműves Batu legendája"),
    new Review("Skibidi Pista", 9.6, "Rézműves Batu legendája"),
    new Review("Skibidi Pista", 9.6, "Rézműves Batu legendája"),
    new Review("Skibidi Pista", 9.6, "Rézműves Batu legendája")
]

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
    for (let index = 0; index < database.length; index++) {
        const element = database[index];
        console.log(element.name + " || " + element.rating + " || " + element.book)
        console.log("---------------------------------------------------------------")
    }
    console.log("Frontendes frontendelés...")
    console.log("Leopárdok megbocskorozása....")
    console.log("Telep meg hódítása...")
    console.log("Verés...")
    console.log("...")
    console.log("Steam machine\n*looks inside*\nelectricity.")
    console.log('$$$$$$$\   $$$$$$\  $$\       $$$$$$\   $$$$$$\  $$$$$$$$\ $$\   $$\ $$\   $$\ $$\   $$\       $$$$$$$\   $$$$$$\     $$$$$\ $$$$$$$$\  $$$$$$\ \n $$  __$$\ $$  __$$\ $$ |     $$  __$$\ $$  __$$\ \____$$  |$$ |  $$ |$$$\  $$ |$$ | $$  |      $$  __$$\ $$  __$$\    \__$$ |\__$$  __|$$  __$$\ \n $$ |  $$ |$$ /  $$ |$$ |     $$ /  \__|$$ /  $$ |    $$  / $$ |  $$ |$$$$\ $$ |$$ |$$  /       $$ |  $$ |$$ /  $$ |      $$ |   $$ |   $$ /  $$ | \n $$ |  $$ |$$ |  $$ |$$ |     $$ |$$$$\ $$ |  $$ |   $$  /  $$ |  $$ |$$ $$\$$ |$$$$$  /        $$$$$$$  |$$$$$$$$ |      $$ |   $$ |   $$$$$$$$ | \n $$ |  $$ |$$ |  $$ |$$ |     $$ |\_$$ |$$ |  $$ |  $$  /   $$ |  $$ |$$ \$$$$ |$$  $$<         $$  __$$< $$  __$$ |$$\   $$ |   $$ |   $$  __$$ | \n $$ |  $$ |$$ |  $$ |$$ |     $$ |  $$ |$$ |  $$ | $$  /    $$ |  $$ |$$ |\$$$ |$$ |\$$\        $$ |  $$ |$$ |  $$ |$$ |  $$ |   $$ |   $$ |  $$ | \n $$$$$$$  | $$$$$$  |$$$$$$$$\\$$$$$$  | $$$$$$  |$$$$$$$$\ \$$$$$$  |$$ | \$$ |$$ | \$$\       $$ |  $$ |$$ |  $$ |\$$$$$$  |   $$ |   $$ |  $$ | \n \_______/  \______/ \________|\______/  \______/ \________| \______/ \__|  \__|\__|  \__|      \__|  \__|\__|  \__| \______/    \__|   \__|  \__|');
});