import React, {Component} from 'react';
import {View, Text} from 'react-native';
import LobbyList from '../Components/LobbyList'
import Promise from 'bluebird';

export default class JoinLobbyScreen extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
        <View style={{
          marginTop: 26,
          // justifyContent: "center",
          // flex: 1,
          // alignItems: "center"
        }}>
          <Text>JoinLobby Screen</Text>
          <LobbyList navigation={this.props.navigation}/>
        </View>
    );
    
  }
}
