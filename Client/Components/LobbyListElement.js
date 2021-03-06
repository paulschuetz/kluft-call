import React, { Component } from 'react';
import {ListItem} from 'react-native-elements'
import {joinLobby} from '../ServerConnection/ServerApi'
import {getUserId} from '../clientStorage'


export default class LobbyListElement extends Component {

  joinLobby = (lobbyId) => {
    // check if full
    const lobbyInfo = this.props.lobbyInfo;
    const lobbyMemberCount = lobbyInfo.lobbyMembers.length;
    const lobbySize = lobbyInfo.game[0].gameType[0].numberOfPlayersAllowed;
    if(lobbyMemberCount>=lobbySize) this.props.showToast("This lobby has reached its maximum size");
    else{
      getUserId()
      .then(userId => joinLobby(lobbyId, userId))
      .then(lobby => {
        // go to lobby screen and send new lobby data
        this.props.navigation.navigate('Lobby', {"lobby": lobby});
        // update list in parent 'LobbyList' component
        this.props.updateListHandler();
      })
      .catch(err => console.log("something went wrong while joining lobby: " + err))
    }
  }

  render() {
    const lobbyInfo = this.props.lobbyInfo;
    const lobbyMemberCount = lobbyInfo.lobbyMembers.length;
    const lobbySize = lobbyInfo.game[0].gameType[0].numberOfPlayersAllowed;
    const lobbyCreatorName = lobbyInfo.lobbyMembers[0].userName;
    const gameName = lobbyInfo.game[0].name;
    return (
      <ListItem
        roundAvatar
        avatar = {{uri: "https://mir-s3-cdn-cf.behance.net/projects/202/6ac6bf42470215.Y3JvcCw5MjIsNzIyLDE4MCww.png"}}
        title = {gameName}
        subtitle = {`Created by ${lobbyCreatorName}`}
        rightTitle = {`${lobbyMemberCount}/${lobbySize}`}
        rightContentContainerStyle= {{"width":"30"}}
        onPress = {() => this.joinLobby(lobbyInfo._id)}
      />
    );
  }
}