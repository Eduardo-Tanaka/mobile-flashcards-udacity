import React from 'react'
import { FlatList, TouchableOpacity  } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Deck from './Deck'
import DeckDetail from './DeckDetail'
import { MyStyledView } from '../utils/glamorous-components'

import { fetchFavorites } from '../actions/index'

class Favorite extends React.Component {
	render() {
    return (
      <MyStyledView>
        <FlatList
				  data={this.props.favorites}
				  renderItem={({item, index}) => 
				  	<TouchableOpacity onPress={() => this.props.navigation.navigate('DeckDetail', { item, index })}>
				  		<Deck deck={item} />
				  	</TouchableOpacity>
				  }
        />
      </MyStyledView>
    );
  }
}

Favorite.propTypes = {
  favorites: PropTypes.array,
}

function mapStateToProps (state, props) {
  return {
    favorites: state.decks.filter(item => { if(item.ID_FAVORITE) return item }),
  }
}

export default connect(
  mapStateToProps,
  null
)(Favorite)