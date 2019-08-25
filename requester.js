const movies = require("./movies.js");
const reddit = require("./reddit.js");

//const redditChecker = setInterval(checkReddit, 60000);

async function checkReddit() {
  var token = reddit.getNewToken();

  const inbox = await reddit
    .checkInbox(token)
    .then(response => (inbox = response))
    .catch(error => console.log(error));

  for (message in inbox) {
    var msgName = message.data.name;
    var msgBody = message.data.body;

    //TODO: Check body of message to see if it is valid request string.
    var movieName;
    var movie;

    var replyBody = null;
    reddit.replyToMessage(token, msgName, replyBody);
  }

  return null;
}

async function findMovie(title) {
  const movie = await movies
    .getMovie(title)
    .then(response => response)
    .catch(error => console.log(error));

  return movie;
}
