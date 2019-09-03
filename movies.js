/**
 * This is where calls to The Movie Database API are made.
 *
 * The calls made are GET requests to search for movies by name, and get
 * reviews for the corresponding movie.
 *
 * Author: Seif Younes
 */

const request = require("request-promise");

const KEY = process.env.MDB_API_KEY;

async function getMovie(title) {
  var settings = {
    qs: {
      query: title,
      api_key: KEY
    },
    async: true,
    crossDomain: true,
    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET"
  };

  var searchResults = JSON.parse(
    await request(settings)
      .then(response => response)
      .catch(error => console.log(error))
  );

  if (searchResults.results.length > 0) {
    const movie = searchResults.results[0];
    return {
      id: movie.id,
      title: movie.original_title
    };
  }
}

async function getReviews(movieID) {
  var settings = {
    qs: {
      language: "en",
      api_key: KEY
    },
    async: true,
    crossDomain: true,
    url: "https://api.themoviedb.org/3/movie/" + movieID + "/reviews",
    method: "GET"
  };

  var searchResults = JSON.parse(
    await request(settings)
      .then(response => response)
      .catch(error => console.log(error))
  );

  var numReviews = searchResults.results.length;
  if (numReviews > 0) {
    var allReviews = "";
    for (result of searchResults.results) {
      allReviews = allReviews.concat("\n\n" + result.content);
    }
    return { numReviews, allReviews };
  }
}

module.exports = {
  getMovie: getMovie,
  getReviews: getReviews
};
