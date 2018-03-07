import React from 'react'
import { Button, Avatar, Input, Text } from 'react-native-elements'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { connect } from 'react-redux'
import Dimensions from 'Dimensions'
import PropTypes from 'prop-types'

import { MyStyledView } from '../utils/glamorous-components'

import { fetchAddDeck } from '../actions/index'

class NewDeck extends React.Component {
	constructor(props) {
    super(props);
    this.state = { text: '', error: false, errorMessage: '' }
  }

  onLayout(e) {
    const { width, height } = Dimensions.get('window')
    // largura da janela menos o padding, para o tamanho do input
    this.setState({ width: width - 20 })
  }

  handleText = (text) => {
    this.setState({ text: text, error: false })
  }

  onSubmit = () => {
    if(this.state.text.trim() === '') {
      this.setState({ error: true, errorMessage: 'Write a name for your Deck!' })
      return;
    }
  	this.props.addDeck(this.state.text)
      .then((value) => this.props.navigation.navigate('DeckDetail', { item: value.deck, index: null }))
      .catch(error => this.setState({ error: true, errorMessage: error.message }))
  }

  render() {
    return (
      <MyStyledView onLayout={() => this.onLayout()}>
      	<MyStyledView justifyContent="center" alignItems="center">
      		<Avatar
					  xlarge
					  rounded
					  icon={{name: 'folder-open'}}
					  activeOpacity={0.7}
					/>
     		</MyStyledView>
     		<MyStyledView noPadding>
     			<Text h3 style={{marginTop:10}}>Deck's Name</Text>
          <Input
            containerStyle={{height:57.5, width:this.state.width, borderBottomColor: 'gray', borderBottomWidth: 1}}
            inputStyle={{marginLeft:0, height:57.5}}
            fontSize={40}
            placeholderTextColor="#b9b9b9"
            placeholder="Deck's name"
            maxLength={50}
            onChangeText={this.handleText}
            value={this.state.text}
            displayError={this.state.error}
            errorMessage={this.state.errorMessage}
            rightIcon={this.state.error ? <FontAwesome name="times" size={40} color="#dc3545" /> : null}
          />
     		</MyStyledView>
     		<MyStyledView noPadding>
     			<Button
     				buttonStyle={{height:50}}
					  onPress={this.onSubmit}
					  containerStyle={{alignItems:"stretch"}}
					  text="Create Deck"
					  icon={<MaterialCommunityIcons name="cards-outline" size={20} color="white" />}
					  iconRight
					  accessibilityLabel="Create Deck"
					/>
     		</MyStyledView> 	
      </MyStyledView>
    )
  }
}

NewDeck.propTypes = {
  navigation: PropTypes.object,
  addDeck: PropTypes.func
}

function mapDispatchToProps (dispatch) {
  return {
    addDeck: (name) => dispatch(fetchAddDeck(name)),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(NewDeck)