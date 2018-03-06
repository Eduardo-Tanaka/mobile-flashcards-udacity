import React from 'react'
import { Alert, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Button, Avatar, Input, Text } from 'react-native-elements'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import Dimensions from 'Dimensions'

import { secondary, info, warning, danger, success } from '../utils/colors'
import { MyStyledView } from '../utils/glamorous-components'

import { fetchDeckById, fetchAddFavorite, fetchRemoveFavorite, fetchDeleteDeck } from '../actions/index' 

class DeckDetail extends React.Component {
	static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      title: params ? `Deck: ${params.item.title}` : ''
    }
  }

  constructor(props) {
    super(props)
    const { width, height } = Dimensions.get('window')
    this.state = {
      fetching: true,
      height: height / 20
    }
  }

	componentDidMount() {
		const { item, index } = this.props.navigation.state.params
		this.props.getDeckById(item, index)
			.then(() => setTimeout(() => this.setState({ fetching: false }), 200))
	}

	onAddQuestion = () => {
		const { item } = this.props.navigation.state.params
		this.props.navigation.navigate('NewQuestion', { item })
	}

	addFavorite = (item) => {
		this.props.addFavorite(item)
			.then((data) => Alert.alert("Favorites", "Deck added to favorites!"))
	}

	removeFavorite = (item) => {
		this.props.removeFavorite(item)
			.then((data) => Alert.alert("Favorites", "Deck removed from favorites!"))
	}

	onPlay = (questions, item, index) => {
		this.props.navigation.navigate('Quiz', { item: item, question: 0, questions: questions, score: 0, index: index })
	}

	deleteDeck = (id) => {
		this.props.deleteDeck(id)
			.then(this.props.navigation.popToTop())
	}

  render() {
  	const { item, index } = this.props.navigation.state.params
  	const { questions, deck } = this.props
  	let color
  	if(deck && deck.perc !== null) {
  		if(deck.perc > 67) {
	  		color = success
	  	} else if(deck.perc > 33) {
	  		color = warning
	  	} else {
	  		color = danger
	  	}
  	}
  	  	
    return (
    	<MyStyledView>
		    {!this.state.fetching 
		    ? deck 
		    	? <MyStyledView>
		      	<MyStyledView justifyContent="center" alignItems="center">
		      		{deck && deck.perc !== null
		      			?	<Avatar
									  xlarge
									  rounded
									  title={deck.perc + "%"}
									  overlayContainerStyle={{backgroundColor:color}}
									  titleStyle={{fontSize:40}}
									  activeOpacity={0.7}
									/>
		      			: <Avatar
									  xlarge
									  rounded
									  icon={{name: 'trophy'}}
									  activeOpacity={0.7}
									/>
		      		}	
			      </MyStyledView>
			      <MyStyledView justifyContent="center" alignItems="center">
		  				<Text h1>{deck && deck.title}</Text>
			        <Text h3><Entypo name="folder" size={28} /> {questions ? questions.length : 0} cards</Text>
		  			</MyStyledView>
			      <MyStyledView justifyContent='space-around'>
			        <Button
		     				buttonStyle={{height:this.state.height, backgroundColor:secondary}}
							  onPress={this.onAddQuestion}
							  containerStyle={{alignItems:"stretch"}}
							  text="Add New Question"
							  icon={<Entypo name="folder" size={20} color="white" />}
							  iconRight
							  accessibilityLabel="Add New Question"
							/>

							{ deck && deck.ID_FAVORITE
								? <Button
				     				buttonStyle={{height:this.state.height, backgroundColor:info}}
									  onPress={() => this.removeFavorite(deck)}
									  containerStyle={{alignItems:"stretch"}}
									  text="Remove From Favorites"
									  icon={<MaterialCommunityIcons name="star" size={20} color="white" />}
									  iconRight
									  accessibilityLabel="Remove From Favorites"
									/>
								: <Button
				     				buttonStyle={{height:this.state.height, backgroundColor:info}}
									  onPress={() => this.addFavorite(deck)}
									  containerStyle={{alignItems:"stretch"}}
									  text="Add To Favorites"
									  icon={<MaterialCommunityIcons name="star-outline" size={20} color="white" />}
									  iconRight
									  accessibilityLabel="Add To Favorites"
									/>
							}
							
							{questions 
								? questions.length !== 0 
									? <Button
					     				buttonStyle={{height:this.state.height}}
										  onPress={() => this.onPlay(questions.length, item, index)}
										  containerStyle={{alignItems:"stretch"}}
										  text="Start Quiz"
										  icon={<MaterialCommunityIcons name="cards-outline" size={20} color="white" />}
										  iconRight
										  accessibilityLabel="Start Quiz"
										  disabled={questions ? questions.length === 0 ? true : false : false}
										/> 
									: <Button
					     				buttonStyle={{height:this.state.height, backgroundColor:secondary}}
										  onPress={this.onAddQuestion}
										  containerStyle={{alignItems:"stretch"}}
										  text="Add a question to play"
										  icon={<Entypo name="folder" size={20} color="white" />}
										  iconRight
										  accessibilityLabel="Add New Question"
										/>
								: null}

								<Button
			     				buttonStyle={{height:this.state.height, backgroundColor:danger}}
								  onPress={() => this.deleteDeck(deck.key)}
								  containerStyle={{alignItems:"stretch"}}
								  text="Delete Deck"
								  icon={<Entypo name="trash" size={20} color="white" />}
								  iconRight
								  accessibilityLabel="Delete Deck"
								/>	
						</MyStyledView>
		      </MyStyledView>
		      : null
		    : <ActivityIndicator size="large" color="#0000ff" />}
	    </MyStyledView>
    )
  }
}

DeckDetail.propTypes = {
  deck: PropTypes.object,
  questions: PropTypes.array,
  navigation: PropTypes.object,
  getDeckById: PropTypes.func,
  addFavorite: PropTypes.func,
  removeFavorite: PropTypes.func,
  deleteDeck: PropTypes.func,
}

function mapStateToProps (state, props) {
  return {
    questions: state.questions,
    deck: state.deck
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getDeckById: (deck, index) => dispatch(fetchDeckById(deck, index)),
    addFavorite: (deck) => dispatch(fetchAddFavorite(deck)),
    removeFavorite: (deck) => dispatch(fetchRemoveFavorite(deck)),
    deleteDeck: (id) => dispatch(fetchDeleteDeck(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetail)