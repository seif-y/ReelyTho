/**
 * Main API and server set-up
 *
 * This is where local API requests will be defined, and data from the other
 * APIs will be shared and processed.
 *
 * Author: Seif Younes
 */

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const movies = require("./movies.js");
const watson = require("./text-analysis.js");
const port = process.env.PORT || 3000;

const app = express();

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var corsOptions = {
  origin: port,
  optionsSuccessStatus: 200
};

app.get("/", (req, res) =>
  res.status(200).sendFile(path.join(__dirname, "homepage.html"))
);

app.get("/movie", cors(corsOptions), async (req, res) => {
  movies
    .getMovie(req.query.title)
    .then(movie => res.status(200).send(movie))
    .catch(error => res.status(400).send("Bad Request"));
});

app.get("/reviews", cors(corsOptions), async (req, res) => {
  movies
    .getReviews(req.query.movieID)
    .then(reviews => res.status(200).send(reviews))
    .catch(error => res.status(400).send("Bad request"));
});

app.post("/analysis", cors(corsOptions), async (req, res) => {
  watson
    .analyseText(req.body.text)
    .then(analysis => res.status(200).send(analysis))
    .catch(error => res.status(400).send(error));
});

app.listen(port, () => console.log("App listening on port " + port));
