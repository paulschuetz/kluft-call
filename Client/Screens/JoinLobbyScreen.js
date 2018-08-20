import React, {Component} from 'react';
import {View, Text} from 'react-native';
import LobbyList from '../Components/LobbyList'
import {getLobbies} from '../ServerConnection/ServerApi'
const Promise = require("bluebird");

export default class JoinLobbyScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      data:[]
    };
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData = async() => {
    const lobbies = await getLobbies(0,100);
    this.setState({lobbyData: lobbies})
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
          <LobbyList lobbies={this.state.lobbyData}></LobbyList>
        </View>
    );
    
  }
}
