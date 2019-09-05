/**
 * This is where calls to the IBM Watson Natural Language Understanding API are made.
 *
 * This file uses IBM's Node SDK for Watson. An instance of the NLU object is created,
 * and calls are made to the API through that instance. The NLU API returns data regarding
 * the sentiment and emotions of given text, using artificial intellegence.
 *
 * Author: Seif Younes
 */

const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1.js");

let nlu;

if (
  process.env.NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY &&
  process.env.NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY !== ""
) {
  nlu = new NaturalLanguageUnderstandingV1({
    version: "2018-04-05",
    url: process.env.NATURAL_LANGUAGE_UNDERSTANDING_URL.replace(/['"]+/g, ""),
    iam_apikey: process.env.NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY.replace(
      /['"]+/g,
      ""
    ),
    iam_url: process.env.ASSISTANT_IAM_URL
  });
} else {
  nlu = new NaturalLanguageUnderstandingV1({
    version: "2018-04-05",
    url: process.env.NATURAL_LANGUAGE_UNDERSTANDING_URL,
    username: process.env.NATURAL_LANGUAGE_UNDERSTANDING_USERNAME,
    password: process.env.NATURAL_LANGUAGE_UNDERSTANDING_PASSWORD
  });
}

async function analyseText(text) {
  const params = {
    text: text,
    features: {
      sentiment: {},
      emotion: {},
      keywords: {
        sentiment: true,
        limit: 5
      }
    }
  };

  var results = await nlu
    .analyze(params)
    .then(response => response)
    .catch(error => console.log("Error", error));

  return results;
}

module.exports = {
  analyseText: analyseText
};
