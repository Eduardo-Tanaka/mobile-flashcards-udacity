import React from 'react'
import { Alert } from 'react-native'
import { Button, Input, CheckBox, Text } from 'react-native-elements'
import { MaterialCommunityIcons, Entypo, FontAwesome } from '@expo/vector-icons'
import { connect } from 'react-redux'
import Dimensions from 'Dimensions'
import RadioForm from 'react-native-simple-radio-button'
import PropTypes from 'prop-types'

import { MyStyledView } from '../utils/glamorous-components'

import { fetchAddQuestion } from '../actions/index'

class NewQuestion extends React.Component {
	constructor(props) {
    super(props);
    this.state = { text: '', error: false, errorMessage: '', checked: false, value: null }
  }

  onLayout(e) {
    const { width, height } = Dimensions.get('window')
    // largura da janela menos o padding, para o tamanho do input
    // altura dividido em 4 partes e subtraído os margin top
    this.setState({ width: width - 20, height: height / 4 - 40 })
  }

  handleText = (text) => {
    this.setState({ text: text, error: false })
  }

  onPressRadio = (value) => {
    this.setState({ value: value })
  }

  onSubmit = () => {
    if(this.state.value === null) {
      Alert.alert("ANSWER", "Choose a answer!")
      return;
    }
    const { item } = this.props.navigation.state.params
    if(this.state.text.trim() === '') {
      this.setState({ error: true, errorMessage: 'Write question description' })
      return;
    }
  	this.props.addQuestion(this.state.text, this.state.value, item)
      .then(() => Alert.alert("QUESTION", "Question saved!"))
      .catch(error => this.setState({ error: true, errorMessage: error.message }))
  }

  render() {
    // array do radio button
    const radio_props = [
      { label: 'INCORRECT', value: 0 },
      { label: 'CORRECT', value: 1 }
    ];
    return (
      <MyStyledView onLayout={this.onLayout.bind(this)}>
     		<MyStyledView noPadding>
     			<Text h2>Question</Text>
          <Input
            containerStyle={{height:this.state.height, width:this.state.width, borderBottomColor: 'gray', borderBottomWidth: 1}}
            inputStyle={{marginLeft:0, height:200}}
            fontSize={40}
            multiline={true}
            placeholderTextColor="#b9b9b9"
            placeholder="Question's description"
            onChangeText={this.handleText}
            value={this.state.text}
            displayError={this.state.error}
            errorMessage={this.state.errorMessage}
            rightIcon={this.state.error ? <FontAwesome name="times" size={48} color="#dc3545" /> : null}
          />
     		</MyStyledView>
     		<MyStyledView justifyContent="center" alignItems="center">
          <RadioForm
            labelStyle={{margin:20}}
            buttonSize={40}
            radio_props={radio_props}
            initial={0}
            formHorizontal={true}
            labelHorizontal={true}
            buttonColor={'#2196f3'}
            animation={true}
            onPress={this.onPressRadio}
            initial={-1}
          />
     		</MyStyledView>
     		<MyStyledView noPadding>
     			<Button
     				buttonStyle={{height:50}}
					  onPress={this.onSubmit}
					  containerStyle={{alignItems:"stretch"}}
					  text="Create Question"
					  icon={<Entypo name="folder" size={20} color="white" />}
					  iconRight
					  accessibilityLabel="Create Question"
					/>
     		</MyStyledView> 	
      </MyStyledView>
    )
  }
}

NewQuestion.propTypes = {
  navigation: PropTypes.object,
  addQuestion: PropTypes.func
}

function mapDispatchToProps (dispatch) {
  return {
    addQuestion: (description, value, id) => dispatch(fetchAddQuestion(description, value, id)),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(NewQuestion)