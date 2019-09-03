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
        if (movie === "") {
          $("#errorMsg").val("Are you sure " + searchTerm + " is a movie?");
        } else {
          resultObject.movie = movie;
          getReviewsFor(movie);
        }
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
        resultObject.reviews = reviews;
        analyseReviews(reviews.allReviews);
      }
    });
  }

  function analyseReviews(reviews) {
    $.ajax({
      async: "true",
      method: "POST",
      url: "/analysis",
      data: { text: reviews },
      cache: true,
      success: analysis => {
        console.log(analysis);
        resultObject.analysis = analysis;
        buildTable();
      }
    });
  }

  function buildTable() {
    $("#movieName").text(
      resultObject.movie.title +
        " - " +
        resultObject.reviews.numReviews +
        " reviews found"
    );
    newRow(
      "General Sentiment",
      resultObject.analysis.sentiment.document.score * 100
    );
    for (keyword of resultObject.analysis.keywords) {
      newRow(keyword.text, keyword.sentiment.score * 100);
    }

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
