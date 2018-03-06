var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const help = `
  <pre>
    Welcome to the Mobile FlashCards API!

    The following endpoints are available:

    GET /decks
      USAGE:
        Get all of the decks available for the app. 

    GET /decks/:id
      USAGE:
        Get all the questions for a particular deck

    POST /decks
      USAGE:
        Add a new deck
      PARAMS:
        deck - String: name of the deck

    DELETE /decks
      USAGE:
        Delete a deck
      PARAMS:
        id - integer: id of the deck

    POST /decks/:id/question
      USAGE:
        Add a question for the deck
      PARAMS:
        id - integer: id of the deck
        description - String: description of the question
        answer - String

    GET /favorites
      USAGE:
        Get all the favorite decks 

    POST /favorites
      USAGE:
        Add a new favorite
      PARAMS:
        id - integer: id of the deck

    DELETE /favorites
      USAGE:
        Delete the favorite

    POST /score
      USAGE:
        Insert or update the score of the deck
      PARAMS:
        id - integer: id of the deck
        score - integer: score of the quiz
        perc - integer: percentage of right answers
 </pre>
  `
  res.send(help);
});

module.exports = router;
