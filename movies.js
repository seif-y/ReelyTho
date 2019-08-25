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

  const searchResults = JSON.parse(
    await request(settings).catch(error => console.log(error))
  );

  const movie = searchResults.results[0];

  return {
    id: movie.id,
    title: movie.original_title
  };
}

module.exports = {
  getMovie: getMovie
};
