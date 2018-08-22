import React, { Component } from 'react';
import {ListItem} from 'react-native-elements'
import Promise from 'bluebird';


export default class LobbyListElement extends Component {

  constructor(props){
    super(props);
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
      />
    );
  }
}