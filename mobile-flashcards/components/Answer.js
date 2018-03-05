import React from 'react'
import { Button, Avatar, Text } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'
import { success, danger } from '../utils/colors'
import { MyStyledView } from '../utils/glamorous-components'
import Expo from 'expo'

const soundObject = new Expo.Audio.Sound();
async function playSound(answer) {
	try {
		if(answer) {
			await soundObject.loadAsync(require('../audio/correct.wav'))
			await soundObject.setVolumeAsync(0.5)
		} else {
			await soundObject.loadAsync(require('../audio/wrong.wav'))
			await soundObject.setVolumeAsync(1)
		}

	  await soundObject.playAsync();
	  // Your sound is playing!
	} catch (error) {
	  // An error occurred!
	  console.log(error)
	}
}

class Answer extends React.Component {
	static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
  
    return {
      title: params ? `Answer: ${params.question + 1} / ${params.questions}` : ''
    }
  }

  componentDidMount() {
  	const { answer } = this.props.navigation.state.params
  	playSound(answer)
  }

  componentWillUnmount() {
  	soundObject.unloadAsync()
  }

  render() {
  	const { question, questions, answer, score, item, index } = this.props.navigation.state.params
  	const color = answer ? success : danger
  	const icon  = answer ? 'check' : 'times'
  	const msg		= answer ? 'CONGRATULATIONS!' : 'Ops, Try Again!'
  	const final = question + 1 === questions ? true : false

    return (
      <MyStyledView>
      	<MyStyledView justifyContent="center" alignItems="center">
      		<Avatar
					  xlarge
					  rounded
					  overlayContainerStyle={{backgroundColor:color}}
					  icon={{name: icon}}
					  activeOpacity={0.7}
					/>
	      </MyStyledView>
	      <MyStyledView justifyContent="center" alignItems="center">
  				<Text h3>{msg}</Text>
  			</MyStyledView>
  			<MyStyledView noPadding >
					{final
						? <Button
		     				buttonStyle={{height:50}}
		     				containerStyle={{alignItems:"stretch"}}
							  onPress={() => this.props.navigation.replace('Finish', { question: question, questions: questions, score: score, item: item, index: index })}
							  text="FINISH"
							  icon={<FontAwesome name="arrow-right" size={20} color="white" />}
							  iconRight
							  accessibilityLabel="FINISH"
							/>
							: <Button
		     				buttonStyle={{height:50}}
		     				containerStyle={{alignItems:"stretch"}}
							  onPress={() => this.props.navigation.replace('Quiz', { question: question + 1, questions: questions, score: score, item: item, index: index })}
							  text="NEXT"
							  icon={<FontAwesome name="arrow-right" size={20} color="white" />}
							  iconRight
							  accessibilityLabel="NEXT"
							/>
						}
				</MyStyledView>
      </MyStyledView>
    )
  }
}

export default Answer