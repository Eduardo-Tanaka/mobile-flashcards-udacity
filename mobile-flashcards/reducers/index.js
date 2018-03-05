import { 
  GET_DECKS, 
  ADD_DECK, 
  GET_DECK_BY_ID, 
  ADD_QUESTION, 
  GET_FAVORITES,
  ADD_FAVORITE, 
  REMOVE_FAVORITE,
  ADD_SCORE
} from '../actions'

const initialState = {
  decks: null,
  questions: null,
  deck: null,
}

function decks (state = initialState, action) {
  switch (action.type) {
    case GET_DECKS :
      return {
        ...state,
        decks: action.decks,
      }

    case ADD_DECK :
      return {
        ...state,
        decks: state.decks.concat(action.deck),
      }

    case GET_DECK_BY_ID :
      return {
        ...state,
        questions: action.questions,
        deck: state.decks.filter(item => { if(item.key === action.key) return item })[0]
      }

    case ADD_QUESTION :
      return {
        ...state,
        questions: state.questions.concat(action.question),
        decks: state.decks.map(item => 
          item.key === action.key
            ? {...item, questions: item.questions + 1}
            : item
        )
      }

    case ADD_FAVORITE :
      return {
        ...state,
        decks: state.decks.map(item => 
          item.key === action.deck.key
            ? {...item, ID_FAVORITE: action.id}
            : item
        ),
        deck: {...state.deck, ID_FAVORITE: action.id}
      }

    case REMOVE_FAVORITE :
      return {
        ...state,
        decks: state.decks.map(item =>
          item.key === action.deck.key
            ? {...item, ID_FAVORITE: null}
            : item
        ),
        deck: {...state.deck, ID_FAVORITE: null}
      }

    case ADD_SCORE :
      return {
        ...state,
        decks: state.decks.map(item =>
          item.key === action.id
            ? {...item, score: action.score, perc: action.perc}
            : item
        )
      }

    default :
      return state
  }
}

function updateImmutableArray(item, action) {
  if(item.key !== action.key) {
    // This isn't the item we care about - keep it as-is
    return item;
  }

  // Otherwise, this is the one we want - return an updated value
  return {
    ...item,
    ...action
  }  
}

export default decks