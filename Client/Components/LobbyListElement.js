import React, { Component } from 'react';
import {ListItem} from 'react-native-elements'


export default class LobbyListElement extends Component {
  render() {
    return (
      <ListItem
        roundAvatar
        avatar = {{uri: "https://mir-s3-cdn-cf.behance.net/projects/202/6ac6bf42470215.Y3JvcCw5MjIsNzIyLDE4MCww.png"}}
        title = {"League of Legends"}
        subtitle = {"created by 808Frittenbude"}
        rightTitle = {"4/5"}
        rightContentContainerStyle= {{"width":"30"}}
      />
    );
  }
}