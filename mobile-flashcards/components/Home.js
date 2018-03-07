import React from 'react'
import { FlatList, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Deck from './Deck'
import DeckDetail from './DeckDetail'
import { MyStyledView } from '../utils/glamorous-components'

import { fetchDecks } from '../actions/index'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
    }
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.props.getDecks()
      .then(() => {
        this.setState({ refreshing: false })
      })
  }

	componentDidMount() {
		this.props.getDecks()
	}

  render() {
    return (
      <MyStyledView>
        {!this.props.decks && <ActivityIndicator size="large" color="#0000ff" />}
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this._onRefresh()}
            />
          }
				  data={this.props.decks}
				  renderItem={({item, index}) => 
				  	<TouchableOpacity onPress={() => this.props.navigation.navigate('DeckDetail', { item, index })}>
				  		<Deck deck={item} />
				  	</TouchableOpacity>
				  }
        />
      </MyStyledView>
    )
  }
}

Home.propTypes = {
  decks: PropTypes.array,
  getDecks: PropTypes.func,
}

function mapStateToProps (state, props) {
  return {
    decks: state.decks
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getDecks: () => dispatch(fetchDecks()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)