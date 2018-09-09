import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';

import RegistrationScreen from './Screens/RegistrationScreen.js'
import HomeScreen from './Screens/HomeScreen.js'
import JoinLobbyScreen from './Screens/JoinLobbyScreen.js'
import CreateLobbyScreen from './Screens/CreateLobbyScreen.js'
import LobbyScreen from './Screens/LobbyScreen.js';

import {establishSocketConnection} from './ServerConnection/Socket';
import StartupScreen from './Screens/StartupScreen.js';

const RootStack = createStackNavigator({
  StartUp: StartupScreen,
  RegisterUser: RegistrationScreen,
  Home: HomeScreen,
  CreateLobby: CreateLobbyScreen,
  JoinLobby: JoinLobbyScreen,
  Lobby: LobbyScreen
}, {initialRouteName: 'StartUp',  headerMode:'none'});

// init socket connection
establishSocketConnection();

export default class App extends React.Component {
  render() {
    return <RootStack/>;
  }
}
