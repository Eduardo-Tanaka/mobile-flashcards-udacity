import React from 'react'
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

import Home from './Home'
import NewDeck from './NewDeck'
import DeckDetail from './DeckDetail'
import NewQuestion from './NewQuestion'
import Quiz from './Quiz'
import Favorite from './Favorite'
import Answer from './Answer'
import Finish from './Finish'

const HomeStack = StackNavigator({
  Home: { 
    screen: Home,
    navigationOptions: {
      title: "Home",
    }
  },
  DeckDetail: { 
    screen: DeckDetail,
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      title: "New Question",
    }
  },
  Quiz: {
    screen: Quiz,
  },
  Answer: {
    screen: Answer
  },
  Finish: {
    screen: Finish,
    navigationOptions: {
      title: "Score"
    }
  }
})

const NewDeckStack = StackNavigator({
  NewDeck: { 
    screen: NewDeck,
    navigationOptions: {
      title: "New Deck",
    }
  },
  DeckDetail: { 
    screen: DeckDetail,
  },
})

const FavoriteStack = StackNavigator({
  Favorite: { 
    screen: Favorite,
    navigationOptions: {
      title: "Favorites",
    }
  },
  DeckDetail: { 
    screen: DeckDetail,
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      title: "New Question",
    }
  },
  Quiz: {
    screen: Quiz,
  },
  Answer: {
    screen: Answer
  },
  Finish: {
    screen: Finish,
    navigationOptions: {
      title: "Score"
    }
  }
})

export const Navigation = TabNavigator(
  {
    Home: { 
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => <MaterialIcons name="home" size={30} color={tintColor} />,
      }
    },
    NewDeck: { 
      screen: NewDeckStack,
      navigationOptions: {
        tabBarLabel: "New Deck",
        tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="cards-outline" size={30} color={tintColor} />  
      }
    },
    Favorite: { 
      screen: FavoriteStack,
      navigationOptions: {
        tabBarLabel: "Favorites",
        tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="star-outline" size={30} color={tintColor} />  
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: '#b9b9b9',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
  }
)