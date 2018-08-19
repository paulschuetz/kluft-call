import React, {Component} from 'react';
import {AsyncStorage, ActivityIndicator, Alert, AppRegistry, View, Text, ImageBackground, Button, TextInput, StyleSheet} from 'react-native';
import {getUsername, persistUsername} from '../persistence.js'

const serverPort = 8080
const serverIp =  "192.168.178.60"
const serverUrl = `http://${serverIp}:${serverPort}/supreme-winfos/kluft-call/1.0.0`
const lobbyEndpoint = serverUrl + "/lobbies"

export default class JoinLobbyScreen extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={{
        justifyContent: "center",
        flex: 1,
        alignItems: "center"
      }}>
      <Text>JoinLobby Screen</Text>
    </View>);
  }
}
