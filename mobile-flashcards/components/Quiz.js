import React from 'react'
import { connect } from 'react-redux'
import { KeyboardAvoidingView } from 'react-native'
import { Button, Avatar, Text, Input } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import Dimensions from 'Dimensions'

import { MyStyledView } from '../utils/glamorous-components'
import { secondary } from '../utils/colors'

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
      textAnswer: '',
      height: 0,
      width: 0
    }
  }

  onLayout(e) {
    const { width, height } = Dimensions.get('window')
    // largura da janela menos o padding, para o tamanho do input
    // altura dividido em 4 partes e subtraído os margin top
    this.setState({ width: width - 20, height: height / 4 - 40 })
  }

  showAnswer = () => {
  	this.setState({ showAnswer: true })
  }

  handleTextAnswer = (text) => {
    this.setState({ textAnswer: text, errorAnswer: false })
  }

	pressAnswer = (question, questions, questionAnswer, score, item, index) => {
		if(this.state.textAnswer.trim() === '') {
      this.setState({ errorAnswer: true, errorMessageAnswer: 'Write question answer' })
      return
    }
		let answer;
		if(this.state.textAnswer.toUpperCase() === questionAnswer.toUpperCase()) {
			answer = true
			score = score + 1
		} else {
			answer = false
		}

		this.props.navigation.replace('Answer', { answer: answer, question: question, questions: questions, score: score, item: item, index: index, questionAnswer: questionAnswer })
	}

  render() { 
  	const { question, score, item, index } = this.props.navigation.state.params
  	const { questions } = this.props
    return (
      <MyStyledView onLayout={() => this.onLayout()}>
      	<MyStyledView justifyContent="center" alignItems="center">
      		<Avatar
					  xlarge
					  rounded
					  icon={{name: 'question'}}
					  activeOpacity={0.7}
					/>
	      </MyStyledView>
      	<KeyboardAvoidingView style={{flex:1, justifyContent:"space-around", alignItems:"center"}} behavior="padding">
  				<Text h2>{questions[question].DS_QUESTION}</Text>
  				<Input
            containerStyle={{width:this.state.width, borderBottomColor: 'gray', borderBottomWidth: 1}}
            inputStyle={{marginLeft:0}}
            fontSize={40}
            placeholderTextColor="#b9b9b9"
            placeholder="Answer"
            onChangeText={this.handleTextAnswer}
            value={this.state.textAnswer}
            displayError={this.state.errorAnswer}
            errorMessage={this.state.errorMessageAnswer}
            rightIcon={this.state.errorAnswer ? <FontAwesome name="times" size={48} color="#dc3545" /> : null}
          />
  			</KeyboardAvoidingView>
  			<MyStyledView justifyContent='space-around'>		
					{this.state.showAnswer === false
  					? <Button
		     				buttonStyle={{height:50, backgroundColor:secondary}}
		     				containerStyle={{alignItems:"stretch"}}
							  onPress={() => this.showAnswer()}
							  text="Show Answer"
							  icon={<FontAwesome name="eye" size={20} color="white" />}
							  iconRight
							  accessibilityLabel="Show Answer"
							/>
						: <Text h2 style={{textAlign:"center"}}>{questions[question].DS_ANSWER}</Text>
					}
					<Button
     				buttonStyle={{height:50}}
     				containerStyle={{alignItems:"stretch"}}
					  onPress={() => this.pressAnswer(question, questions.length, questions[question].DS_ANSWER, score, item, index)}
					  text="SUBMIT"
					  icon={<FontAwesome name="check" size={20} color="white" />}
					  iconRight
					  accessibilityLabel="SUBMIT"
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