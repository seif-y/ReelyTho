var resultObject = {
  movie: undefined,
  reviews: undefined,
  analysis: undefined
};

$(document).ready(function() {
  var form = $("#movieForm");
  var input = $("#inputFilm");
  var error = $("#errorMsg");
  var results = $("#results");

  results.hide();
  error.hide();

  form.submit(async function(event) {
    event.preventDefault();
    searchForMovie(input.val());
  });

  async function searchForMovie(searchTerm) {
    $.ajax({
      async: "true",
      method: "GET",
      url: "/movie",
      data: { title: searchTerm },
      success: movie => {
        console.log("movie", movie);
        resultObject.movie = movie;
        getReviewsFor(movie);
      }
    });
  }

  function getReviewsFor(movie) {
    $.ajax({
      async: "true",
      method: "GET",
      url: "/reviews",
      data: { movieID: movie.id },
      success: reviews => {
        console.log("reviews", reviews);
        resultObject.reviews = reviews;
        buildTable();
      }
    });
  }

  function analyseReviews(reviews) {
    $.ajax({
      async: "true",
      method: "GET"
    });
  }

  function buildTable() {
    $("#movieName").text(
      resultObject.movie.title +
        " - " +
        resultObject.reviews.numReviews +
        " reviews found"
    );
    newRow("General Sentiment", 27);
    newRow("Key Word 1", 70);
    newRow("Key Word 2", 56);
    newRow("Key Word 3", 12);

    $("#movieForm").hide();
    $("#results").show();
  }

  function newRow(title, percentage) {
    $("#results").append(
      '<div class="row"><div class="col-3">' +
        title +
        '</div><div class="col-9"><div class="progress"><div class="progress-bar bg-dark" role="progressbar" style=" width: ' +
        percentage +
        '%">' +
        percentage +
        "</div></div></div></div>"
    );
  }
});
