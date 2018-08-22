import React, { Component } from 'react';
import { FlatList } from 'react-native';
import LobbyListElement from './LobbyListElement.js'
import {List} from 'react-native-elements';
import {getLobbies} from '../ServerConnection/ServerApi'
import Promise from 'bluebird';

export default class LobbyList extends Component {

  constructor(props){
    super(props);
    this.state = {
      lobbyData:[]
    };
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData = async() => {
    const lobbies = await getLobbies(0, 100);
    this.setState({lobbyData: lobbies})
  }

  render() {
    return (
      <List>
        <FlatList
          data={this.state.lobbyData}
          keyExtractor={(x, i) => i.toString()}
          renderItem = 
              {({ item }) => 
              <LobbyListElement lobbyInfo={item}/>
            }
        />
      </List>
    );
  }
}