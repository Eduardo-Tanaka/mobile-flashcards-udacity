import FlashCardsApi from '../api/api' 

export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const GET_DECK_BY_ID = 'GET_DECK_BY_ID'
export const ADD_QUESTION = 'ADD_QUESTION'

export const GET_FAVORITES = 'GET_FAVORITES'
export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'

export const ADD_SCORE = 'ADD_SCORE'

function decks(decks) {
	return {
  	type: GET_DECKS,
  	decks
	}
}

export function fetchDecks() {
	return (dispatch) => {
    return FlashCardsApi.getAllDecks()
	    .then(data => dispatch(decks(data)))
	    .catch((error) => {
	    	console.log(error)
	    })
	}
}

function addDeck(deck) {
	return {
  	type: ADD_DECK,
  	deck
	}
}

export function fetchAddDeck(name) {
	return (dispatch) => {
    return FlashCardsApi.addDeck(name)
	    .then(data => dispatch(addDeck({key: data.id, title: name, questions: 0, score:null, perc: null})))
	    .catch((error) => {
	    	throw Error(error.message);
	    })
	}
}

function deleteDeck(id) {
	return {
  	type: DELETE_DECK,
  	id
	}
}

export function fetchDeleteDeck(id) {
	return (dispatch) => {
    return FlashCardsApi.deleteDeck(id)
	    .then(data => dispatch(deleteDeck(id)))
	    .catch((error) => {
	    	throw Error(error.message);
	    })
	}
}

function getDeckById(questions, key) {
	return {
  	type: GET_DECK_BY_ID,
  	questions,
  	key
	}
}

export function fetchDeckById(deck, index) {
	return (dispatch) => {
    return FlashCardsApi.getDeckById(deck.key)
	    .then(data => dispatch(getDeckById(data, deck.key)))
	    .catch((error) => {
	    	console.log(error)
	    })
	}
}

function addQuestion(question, key) {
	return {
  	type: ADD_QUESTION,
  	question,
  	key
	}
}

export function fetchAddQuestion(description, answer, deck) {
	return (dispatch) => {
    return FlashCardsApi.addQuestion(description, answer, deck.key)
	    .then(data => dispatch(addQuestion(data, deck.key)))
	    .catch((error) => {
	    	throw Error(error.message);
	    })
	}
}

function getFavorites(decks) {
	return {
  	type: GET_FAVORITES,
  	decks
	}
}

export function fetchFavorites() {
	return (dispatch) => {
    return FlashCardsApi.getFavorites()
	    .then(data => dispatch(getFavorites(data)))
	    .catch((error) => {
	    	console.log(error)
	    })
	}
}

function addFavorite(deck, id) {
	return {
  	type: ADD_FAVORITE,
  	deck,
  	id
	}
}

export function fetchAddFavorite(deck) {
	return (dispatch) => {
    return FlashCardsApi.addFavorite(deck.key)
	    .then(data => dispatch(addFavorite(deck, data.insertId)))
	    .catch((error) => {
	    	throw Error(error.message);
	    })
	}
}

function removeFavorite(deck, id) {
	return {
  	type: REMOVE_FAVORITE,
  	deck,
  	id
	}
}

export function fetchRemoveFavorite(deck) {
	return (dispatch) => {
    return FlashCardsApi.removeFavorite(deck)
	    .then(data => dispatch(removeFavorite(deck, null)))
	    .catch((error) => {
	    	throw Error(error.message);
	    })
	}
}

function addScore(id, score, perc) {
	return {
  	type: ADD_SCORE,
  	id,
  	score,
  	perc
	}
}

export function fetchAddScore(id, score, perc) {
	return (dispatch) => {
    return FlashCardsApi.addOrUpdateScore(id, score, perc)
	    .then(data => dispatch(addScore(id, score, perc)))
	    .catch((error) => {
	    	throw Error(error.message);
	    })
	}
}