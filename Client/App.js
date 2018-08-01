import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';

import RegistrationScreen from './Screens/RegistrationScreen.js'
import HomeScreen from './Screens/HomeScreen.js'
import JoinLobbyScreen from './Screens/JoinLobbyScreen.js'
import CreateLobbyScreen from './Screens/CreateLobbyScreen.js'

const RootStack = createStackNavigator({
  Home: HomeScreen,
  CreateLobby: CreateLobbyScreen,
  JoinLobby: JoinLobbyScreen,
  RegisterUser: RegistrationScreen
}, {initialRouteName: 'RegisterUser', headerMode:'none'});

export default class App extends React.Component {
  render() {
    return <RootStack/>;
  }
}
