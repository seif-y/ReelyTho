$(document).ready(function() {
  var form = $("#movieForm");
  var input = $("#inputFilm");
  var error = $("#errorMsg");
  var results = $("#results");

  console.log("Started");

  results.hide();
  error.hide();

  form.submit(function(event) {
    event.preventDefault();
    console.log(input.val());
    doSearch(input.val());
  });

  function doSearch(searchTerm) {
    $.ajax({
      async: "true",
      method: "GET",
      url: "/movie",
      data: { title: searchTerm },
      success: movie => {
        console.log(movie);
        if (movie === "") {
          console.log("not found");
          results.text("Movie " + input.val() + "not found");
        } else {
          console.log(movie.title);
          results.text(movie.title);
        }
        form.hide();
        results.show();
      }
    });
  }
});
