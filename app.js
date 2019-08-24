/**
 * Main API and server set-up
 *
 * This is where local API requests will be defined, and data from the other
 * APIs will be shared and processed.
 *
 * Author: Seif Younes
 */

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const movies = require("./movies.js");

app.get("/", (req, res) => res.status(200).send("Hello World"));

app.get("/movie", async (req, res) => {
  movies
    .getMovie(req.query.title)
    .then(movie => res.status(200).send(movie))
    .catch(error => res.status(400).send("Whatchu doin bruh"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
