import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import LobbyListElement from './LobbyListElement.js'
import {List} from 'react-native-elements';

export default class LobbyList extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <List>
        <FlatList
          data={this.props.lobbies}
          keyExtractor={(x, i) => i.toString()}
          renderItem = 
              {({ item }) => 
              <LobbyListElement text={item._id}/>
            }
        />
      </List>
    );
  }
}