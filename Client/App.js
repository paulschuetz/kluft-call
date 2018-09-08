import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';

import RegistrationScreen from './Screens/RegistrationScreen.js'
import HomeScreen from './Screens/HomeScreen.js'
import JoinLobbyScreen from './Screens/JoinLobbyScreen.js'
import CreateLobbyScreen from './Screens/CreateLobbyScreen.js'
import LobbyScreen from './Screens/LobbyScreen.js';

import {establishSocketConnection} from './ServerConnection/Socket';

const RootStack = createStackNavigator({
  RegisterUser: RegistrationScreen,
  Home: HomeScreen,
  CreateLobby: CreateLobbyScreen,
  JoinLobby: JoinLobbyScreen,
  Lobby: LobbyScreen
}, {initialRouteName: 'RegisterUser',  headerMode:'none'});

// init socket connection
establishSocketConnection();

export default class App extends React.Component {
  render() {
    return <RootStack/>;
  }
}
