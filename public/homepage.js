$(document).ready(function() {
  var form = $("#movieForm");
  var input = $("#inputFilm");
  var error = $("#errorMsg");
  var results = $("#results");

  results.hide();
  error.hide();

  form.submit(function(event) {
    event.preventDefault();
    doSearch(input.val());
  });

  function doSearch(searchTerm) {
    $.ajax({
      async: "true",
      method: "GET",
      url: "/movie",
      data: { title: searchTerm },
      success: movie => {
        if (movie === "") {
          error.text("Movie " + input.val() + "not found");
          error.show();
        } else {
          $("#movieName").text(movie.title);
          analyseMovie(movie);
          form.hide();
          results.show();
        }
      }
    });
  }

  function analyseMovie(movie) {
    newRow("General Sentiment", 27);
    newRow("Key Word 1", 70);
    newRow("Key Word 2", 56);
    newRow("Key Word 3", 12);
  }

  function newRow(title, percentage) {
    results.append(
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
