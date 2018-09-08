import React, { Component } from 'react';
import { FlatList } from 'react-native';
import LobbyListElement from './LobbyListElement.js'
import {List} from 'react-native-elements';
import {getLobbies} from '../ServerConnection/ServerApi'
import {getSocket} from '../ServerConnection/Socket';

export default class LobbyList extends Component {

  constructor(props){
    super(props);
    this.state = {
      lobbyData:[]
    };
    this.handleListUpdate = this.handleListUpdate.bind(this);
    
  }

  componentDidMount(){
    console.log("toast obj: " + JSON.stringify(this.props.showToast))
    console.log("mounting LobbyList")
    // fetch lobbies
    this.fetchData();
    // set listener, so we can update the list if user navigates back
    this.subs = [
      this.props.navigation.addListener('willFocus', () => this.fetchData()),
    ];
    // get socket subscribe to event
    let socket = getSocket();
    socket.on('lobbies changed', () => {
      console.log('lobbies updated');
      this.fetchData();
    });
  }

  componentWillUnmount(){
    this.subs.forEach(sub => sub.remove());
    let socket = getSocket();
    socket.off('lobbies updated')
  }

  fetchData = async() => {
    const lobbies = await getLobbies(0, 100);
    this.setState({lobbyData: lobbies})
  }

  handleListUpdate(){
    this.fetchData();
  }

  render() {
    return (
      <List>
        <FlatList
          data={this.state.lobbyData}
          keyExtractor={(x, i) => i.toString()}
          renderItem = 
              {({ item }) => 
              <LobbyListElement navigation={this.props.navigation} lobbyInfo={item} updateListHandler = {this.handleListUpdate} showToast={this.props.showToast}/>
            }
        />
      </List>
    );
  }
}