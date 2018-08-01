import React, {Component} from 'react';
import {AsyncStorage, View, Text, ImageBackground, Button, TextInput, StyleSheet} from 'react-native';
import {getUsername, persistUsername} from '../persistence.js'


export default class CreateLobbyScreen extends Component {
  render() {
    return (<View style={{
        justifyContent: "center",
        flex: 1,
        alignItems: "center"
      }}>
      <Text>CreateLobby Screen</Text>
    </View>);
  }
}
