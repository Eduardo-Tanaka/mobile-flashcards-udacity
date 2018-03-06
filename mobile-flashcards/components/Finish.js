import React from 'react'
import { Button, Avatar, Text } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'
import { success, danger, warning, secondary } from '../utils/colors'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { MyStyledView } from '../utils/glamorous-components'
import { setLocalNotification, clearLocalNotification } from '../utils/notification'

import { fetchAddScore } from '../actions/index' 

class Finish extends React.Component {
	componentDidMount() {
		const { item, score, questions } = this.props.navigation.state.params
    const perc = Math.round(score * 100 / questions)
		this.props.addScore(item.key, score, perc)

    clearLocalNotification()
      .then(setLocalNotification())
	}

  render() {
  	const { question, questions, score, item, index } = this.props.navigation.state.params
  	const perc = Math.round(score * 100 / questions)
  	let color
  	if(perc > 67) {
  		color = success
  	} else if(perc > 33) {
  		color = warning
  	} else {
  		color = danger
  	}
    return (
      <MyStyledView>
      	<MyStyledView justifyContent="center" alignItems="center">
      		<Avatar
					  xlarge
					  rounded
					  overlayContainerStyle={{backgroundColor:color}}
					  icon={{name: 'trophy'}}
					  activeOpacity={0.7}
					/>
	      </MyStyledView>
      	<MyStyledView justifyContent="center" alignItems="center">
  				<Text h2>Score: {score} / {questions} - {perc}%</Text>
  			</MyStyledView>
  			<MyStyledView justifyContent='space-around'>
					<Button
     				buttonStyle={{height:50, backgroundColor:secondary}}
     				containerStyle={{alignItems:"stretch"}}
					  onPress={() => this.props.navigation.replace('DeckDetail', { item, index })}
					  text="Back To Deck"
					  icon={<FontAwesome name="arrow-right" size={20} color="white" />}
					  iconRight
					  accessibilityLabel="Back To Deck"
					/>
					<Button
     				buttonStyle={{height:50}}
     				containerStyle={{alignItems:"stretch"}}
					  onPress={() => this.props.navigation.replace('Quiz', { question: 0, questions: questions, score: 0, item: item, index: index })}
					  text="Restart Quiz"
					  icon={<FontAwesome name="arrow-right" size={20} color="white" />}
					  iconRight
					  accessibilityLabel="Restart Quiz"
					/>
				</MyStyledView>
      </MyStyledView>
    )
  }
}

Finish.propTypes = {
  navigation: PropTypes.object,
  addScore: PropTypes.func
}

function mapDispatchToProps (dispatch) {
  return {
    addScore: (id, score, perc) => dispatch(fetchAddScore(id, score, perc)),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Finish)