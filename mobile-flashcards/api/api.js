import { url, headers } from '../config/apiConfig'

class FlashCardsApi {
	static getAllDecks() {
		return fetch(`${url}/decks`, { headers })
	    .then((response) => {
				if (!response.ok) {
					throw Error("Erro ao recuperar os decks")
				}

		    return response.json()
	    })
	}

	static addDeck(name) {
		return fetch(`${url}/decks`, { 
				method: 'POST', 
				headers, 
				body: JSON.stringify({ deck: name })
			})
	    .then((response) => {
				if (!response.ok) {
					throw Error("Nome de deck já utilizado!")
				}
				
		    return response.json()
	    })
	}

	static deleteDeck(id) {
		return fetch(`${url}/decks`, { 
				method: 'DELETE', 
				headers, 
				body: JSON.stringify({ id: id })
			})
	    .then((response) => {
				if (!response.ok) {
					throw Error("Não foi possível deletar o deck!")
				}
				
		    return response.json()
	    })
	}

	static getDeckById(id) {
		return fetch(`${url}/decks/${id}`, { headers })
	    .then((response) => {
				if (!response.ok) {
					throw Error("Erro ao recuperar dados do deck")
				}

		    return response.json()
	    })
	}

	static addQuestion(description, answer, id) {
		return fetch(`${url}/decks/${id}/question`, { 
				method: 'POST', 
				headers, 
				body: JSON.stringify({ description: description, answer: answer, id: id })
			})
	    .then((response) => {
				if (!response.ok) {
					throw Error("Erro ao salvar questao!")
				}
				
		    return response.json()
	    })
	}

	static getFavorites() {
		return fetch(`${url}/favorites`, { headers })
	    .then((response) => {
				if (!response.ok) {
					throw Error("Erro ao recuperar os favoritos")
				}

		    return response.json()
	    })
	}

	static addFavorite(id) {
		return fetch(`${url}/favorites`, { 
				method: 'POST', 
				headers, 
				body: JSON.stringify({ id: id })
			})
	    .then((response) => {
				if (!response.ok) {
					throw Error("Erro ao adicionar aos favoritos")
				}
				
		    return response.json()
	    })
	}

	static removeFavorite(deck) {
		return fetch(`${url}/favorites`, { 
				method: 'DELETE', 
				headers, 
				body: JSON.stringify({ deck: deck })
			})
	    .then((response) => {
				if (!response.ok) {
					throw Error("Erro ao remover dos favoritos")
				}
				
		    return response.json()
	    })
	}

	static addOrUpdateScore(id, score, perc) {
		return fetch(`${url}/score`, { 
			method: 'POST', 
			headers, 
			body: JSON.stringify({ id: id, score: score, perc: perc })
		})
    .then((response) => {
			if (!response.ok) {
				throw Error("Erro ao atualizar a pontuação")
			}
			
	    return response.json()
    })
	}
}

export default FlashCardsApi;