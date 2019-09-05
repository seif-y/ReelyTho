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
        " Review(s) Found"
    );
    newRowMetric(
      "General Sentiment",
      toPercentage(resultObject.analysis.sentiment.document.score)
    );

    newRowTitle("Key Words From Reviews");
    for (keyword of resultObject.analysis.keywords) {
      newRowMetric(keyword.text, toPercentage(keyword.sentiment.score));
    }

    newRowTitle("Emotions Conveyed by Reviews");
    var emotion = resultObject.analysis.emotion.document.emotion;
    newRowMetric("anger", toPercentage(emotion.anger));
    newRowMetric("disgust", toPercentage(emotion.disgust));
    newRowMetric("fear", toPercentage(emotion.fear));
    newRowMetric("joy", toPercentage(emotion.joy));
    newRowMetric("sadness", toPercentage(emotion.sadness));

    $("#movieForm").hide();
    $("#results").show();
  }

  function newRowMetric(title, percentage) {
    $("#results").append(
      '<div class="row" style="margin-top: 20px;"><div class="col-3">' +
        title.toUpperCase() +
        '</div><div class="col-9"><div class="progress"><div class="progress-bar bg-dark" role="progressbar" style=" width: ' +
        percentage +
        '%">' +
        percentage +
        "</div></div></div></div>"
    );
  }

  function newRowTitle(title) {
    $("#results").append(
      '<div class="row" style="margin-top: 50px;"><div class="col" style="text-align: left;"><h1>' +
        title +
        "</h1></div></div>"
    );
  }

  function toPercentage(score) {
    return Math.round(((score + 1) / 2) * 100);
  }
});
