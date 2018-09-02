import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';

import RegistrationScreen from './Screens/RegistrationScreen.js'
import HomeScreen from './Screens/HomeScreen.js'
import JoinLobbyScreen from './Screens/JoinLobbyScreen.js'
import CreateLobbyScreen from './Screens/CreateLobbyScreen.js'
import LobbyScreen from './Screens/LobbyScreen.js';

const RootStack = createStackNavigator({
  RegisterUser: RegistrationScreen,
  Home: HomeScreen,
  CreateLobby: CreateLobbyScreen,
  JoinLobby: JoinLobbyScreen,
  Lobby: LobbyScreen
}, {initialRouteName: 'Home',  headerMode:'none'});

export default class App extends React.Component {
  render() {
    return <RootStack/>;
  }
}
