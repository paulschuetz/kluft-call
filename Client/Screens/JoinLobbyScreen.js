import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import LobbyList from '../Components/LobbyList'
import Toast, {DURATION} from 'react-native-easy-toast'

export default class JoinLobbyScreen extends Component {

  constructor(props){
    super(props);
  }

  showToast = (text) => {
    this.refs.toast.show(text);
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
          <LobbyList navigation={this.props.navigation} showToast={this.showToast}/>
          <Toast ref="toast"/>
        </View>
    );
    
  }
}
