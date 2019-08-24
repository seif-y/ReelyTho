/**
 * This is where calls to Reddit's API are made.
 *
 * Reddit uses expiring tokens, so a method needs to be set up
 * to get new tokens using the API refresh token. There are also
 * requests set up to get a list of unread messages from the account's
 * inbox, and reply to these messages. The idea is for users to be able
 * to mention the bot account name and a movie name in a comment, and
 * it would reply with an analysis of the reviews for that movie.
 *
 * Author: Seif Younes
 */

const request = require("request-promise");

const TOKEN = process.env.REDDIT_REFRESH_TOKEN.replace(/['"]+/g, "");
const ID = process.env.REDDIT_CLIENT_ID.replace(/['"]+/g, "");
const SECRET = process.env.REDDIT_CLIENT_Secret.replace(/['"]+/g, "");

async function getNewToken() {
  var settings = {
    //auth: "Basic " + new Buffer(ID + ":" + SECRET).toString("base64"),
    form: {
      grant_type: "refresh_token",
      refresh_token: TOKEN
    },
    async: true,
    crossDomain: true,
    url: "https://" + ID + ":" + SECRET + "@www.reddit.com/api/v1/access_token",
    method: "POST"
  };

  const response = JSON.parse(
    await request(settings).catch(error => console.log(error))
  );

  return response.access_token;
}

async function checkInbox(bearerToken) {
  var settings = {
    headers: {
      Authorization: "bearer 345361280856-wkynmPMi4ywaARXulxaSjziC9Vw"
    },
    async: true,
    crossDomain: true,
    url: "https://oauth.reddit.com/message/unread",
    method: "GET"
  };

  const response = JSON.parse(
    await request(settings).catch(error => console.log(error))
  );

  return response.data;
}
