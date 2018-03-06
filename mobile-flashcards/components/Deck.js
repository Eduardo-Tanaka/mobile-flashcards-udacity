import React from 'react'
import { Text, View } from 'react-native'
import Dimensions from 'Dimensions'
import { Entypo } from '@expo/vector-icons'
import glamorous from 'glamorous-native'
import PropTypes from 'prop-types'
import { LinearGradient } from 'expo'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const ViewContainer = glamorous.view({
  flex: 1,
  height: height / 6,
  marginVertical: 15,
  marginHorizontal: 20,
  elevation: 7,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.8,
  shadowRadius: 3,
  backgroundColor : "#000"
})

const ViewDeckProgress = glamorous(LinearGradient)({
  flex: 4,
  justifyContent: "center",
  alignItems: "center"
})

const ViewDeck = glamorous.view({
  backgroundColor: "white",
  justifyContent: "space-around",
  flex: 2,
  paddingLeft: 10
})

class Deck extends React.Component {
  render() {
  	const { deck } = this.props
    // cores do gradient de acordo com a porcentagem de acertos no quiz
    let color1
    let color2
    if(deck.perc !== null) {
      if(deck.perc > 67) {
        color1 = '#8bc34a'
        color2 = '#4caf50'
      }  else if(deck.perc > 33) {
        color1 = '#ffc107'
        color2 = '#ff9800'
      } else {
        color1 = '#ff5f2d'
        color2 = '#f44336'
      }
    } else {
      color1 = '#6c757d'
      color2 = '#6c757d'
    }
    
    return (
      <ViewContainer>
        <ViewDeckProgress
          colors={[color1, color2]}
          start={[0.1, 0.1]}>
          <Text style={{fontSize: 40, color:'white'}}>{deck.perc !== null ? `${deck.score} / ${deck.questions} - ${deck.perc}%` : 'Play Quiz'}</Text>
        </ViewDeckProgress>
        <ViewDeck>
          <Text style={{color:"gray"}}>Deck: {deck.title}</Text>
          <Text><Entypo name="folder" size={15} /> {deck.questions || 0} cards</Text>
        </ViewDeck>
      </ViewContainer>
    );
  }
}

Deck.propTypes = {
  deck: PropTypes.object
}

export default Deck