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

async function analyseText(review, movieName) {
  const params = {
    text: review,
    features: {
      sentiment: {
        targets: [movieName]
      },
      emotion: {
        targets: [movieName]
      }
    }
  };

  var results = await nlu
    .analyze(params)
    .then(response => response)
    .catch(error => console.log("FUCK"));

  return results;
}

/* Just some code to test the Watson API calls
 
const review =
  "The Godfather Review by Al Carlson\r\n\r\nThe Godfather is a film considered by most to be one of the greatest ever made. From The American Film Institute to as voted by users on the Internet Movie Database (IMDB) it is consider to be one of the best. As a film that ranks as high as other masterpieces including Citizen Kane, Pulp Fiction and 12 Angry Men, The Godfather is an exceptional piece of cinema excellence that is flawless and is simply the pinnacle crime drama.\r\nThe Godfather revolves around the Corleone’s, an Italian family with deep roots in the New York City mafia. The head of the Corleone’s is Don Vito Corleone, a man who takes care of his family and demands respect in return. His son Michael however, who just returned home from World War II, doesn’t want to become involved with the family business. The Sollozzo’s, a family of drug dealers, confront Don and request protection in exchange for profits from the Sollozzo’s drug sales. But Don declines the offer, for he is against selling narcotics. The rejected offer starts what turns into an all out mafia war between the two families with Michael diving deep into the mafia lifestyle.\r\nThe characters are portrayed by a legendary all-star cast including Marlon Brando as Don, Al Pacino as his son Michael and James Caan as Don’s oldest son Sonny. The casting for this film has been considered by many to be the best casted film in history for their astonishing performances. All three main actors were nominated for an academy award, but only Marlon Brando won an Oscar for best actor in a leading role. It’s fascinating to watch how these characters change over the course of the movie, with one in particular changing drastically.\r\nDirecter Francis Ford Coppola, being raised in an Italian-American family in New York, understood Italian culture exceptionally and made the film very authentically. Everything from the wedding dances to the cuisine to the terms used by the characters in Sicilian come from Coppola’s first-hand knowledge of Italian-American culture. Italian composer Nino Rota did an outstanding job making the soundtrack for the film, despite not getting the Oscar for best music (but he did win an Oscar for his work in the sequel, The Godfather: Part II). Virtually everyone recognizes that iconic trumpet solo once it starts playing. He also wrote the score for another great Italian film 8 1/2. \r\nThis film should be immediately followed up by it’s sequel, The Godfather: Part II, which also won best picture. The series still holds the title of most best picture awards for a film series to this day. They’re both flawless crime dramas and have earned their titles as some of the best pieces of cinema ever. I will guarantee you won’t be able to see this film only once, as it gets better after continual viewings. There is really nothing more to add other than if you haven’t seen this movie yet, it’s about time you did. The Godfather is a movie you can’t refuse.";
analyseText(review, "Godfather")
  .then(response => {
    console.log(response.emotion.document);
    console.log(response.emotion.targets);
    console.log(response.sentiment.document);
    console.log(response.sentiment.targets);
  })
  .catch(error => console.log("aww nuts"));
  */
