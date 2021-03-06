import React, {Component} from 'react';
import {View,ImageBackground, Button, BackHandler} from 'react-native';

import {isRegistered} from '../clientStorage';

export default class HomeScreen extends Component {

  constructor(props){
       super(props);
       isRegistered();
   }

   componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
   }

   componentWillUnmount(){
     console.log("unmounting");
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  // socket = SocketIOClient('http://192.168.178.60:8080');
  render() {
    return (<ImageBackground source={require('../Assets/KluftcallBackground.png')} style={{
        justifyContent: "center",
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'column'
      }}>
      <View style={{
          marginBottom: 10
        }}>
        <Button title="Create Lobby" color="pink" onPress={() => this.props.navigation.navigate('CreateLobby')}/>
      </View>
      <Button title="Join Lobby" color="pink" onPress={() => this.props.navigation.navigate('JoinLobby')}
      />
    </ImageBackground>);
  }
}
