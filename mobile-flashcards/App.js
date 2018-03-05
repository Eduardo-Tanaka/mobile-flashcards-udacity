import React from 'react'
import { Text, View, StatusBar } from 'react-native'
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Constants } from 'expo'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import reducer from './reducers'

import Home from './components/Home'
import NewDeck from './components/NewDeck'
import DeckDetail from './components/DeckDetail'
import { Navigation } from './components/Navigation'
import { MyStyledView } from './utils/glamorous-components'

import { setLocalNotification } from './utils/notification'

/*function FlashCardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}*/

function configureStore() {
  const store = createStore(reducer, {}, applyMiddleware(thunk));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

const store = configureStore()

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <MyStyledView noPadding>
          <Navigation />
        </MyStyledView>
      </Provider>
    );
  }
}