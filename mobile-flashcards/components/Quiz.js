import React from 'react'
import { connect } from 'react-redux'
import { Button, Avatar, Text } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'
import PropTypes from 'prop-types'

import { MyStyledView } from '../utils/glamorous-components'
import { success, danger, secondary } from '../utils/colors'

class Quiz extends React.Component {
	static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
  
    return {
      title: params ? `Quiz: ${params.question + 1} / ${params.questions}` : ''
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false,
      answer: null
    }
  }

  showAnswer = (value) => {
  	this.setState({ showAnswer: true, answer: value })
  }

	pressAnswer = (value, question, questions, value2, score, item, index) => {
		let answer;
		if(value === value2) {
			answer = true
			score = score + 1
		} else {
			answer = false
		}

		this.props.navigation.replace('Answer', { answer: answer, question: question, questions: questions, score: score, item: item, index: index })
	}

  render() { 
  	const { question, score, item, index } = this.props.navigation.state.params
  	const { questions } = this.props
  	const color = this.state.answer === 1 ? success : danger
    return (
      <MyStyledView>
      	<MyStyledView justifyContent="center" alignItems="center">
      		<Avatar
					  xlarge
					  rounded
					  icon={{name: 'question'}}
					  activeOpacity={0.7}
					/>
	      </MyStyledView>
      	<MyStyledView justifyContent="center" alignItems="center">
  				<Text h2>{questions[question].DS_QUESTION}</Text>
  			</MyStyledView>
  			<MyStyledView justifyContent='space-around'>		
	        <Button
     				buttonStyle={{height:50, backgroundColor:danger}}
     				containerStyle={{alignItems:"stretch"}}
					  onPress={() => this.pressAnswer(0, question, questions.length, questions[question].IC_QUESTION, score, item, index)}
					  text="INCORRECT"
					  icon={<FontAwesome name="times" size={20} color="white" />}
					  iconRight
					  accessibilityLabel="INCORRECT"
					/>
					{this.state.showAnswer === false
  					? <Button
		     				buttonStyle={{height:50, backgroundColor:secondary}}
		     				containerStyle={{alignItems:"stretch"}}
							  onPress={() => this.showAnswer(questions[question].IC_QUESTION)}
							  text="Show Answer"
							  icon={<FontAwesome name="eye" size={20} color="white" />}
							  iconRight
							  accessibilityLabel="Show Answer"
							/>
						: <Text h2 style={{textAlign:"center", color:color}}>{this.state.answer === 1 ? 'CORRECT' : 'INCORRECT'}</Text>
					}
					<Button
     				buttonStyle={{height:50, backgroundColor:success}}
     				containerStyle={{alignItems:"stretch"}}
					  onPress={() => this.pressAnswer(1, question, questions.length, questions[question].IC_QUESTION, score, item, index)}
					  text="CORRECT"
					  icon={<FontAwesome name="check" size={20} color="white" />}
					  iconRight
					  accessibilityLabel="CORRECT"
					/>
				</MyStyledView>
      </MyStyledView>
    )
  }
}

Quiz.propTypes = {
  navigation: PropTypes.object,
  questions: PropTypes.array
}

function mapStateToProps (state, props) {
  return {
    questions: state.questions,
  }
}

export default connect(
  mapStateToProps,
  null
)(Quiz)