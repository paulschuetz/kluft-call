import React, {Component} from 'react';
import {
  Alert,
  AppRegistry,
  View,
  Text,
  ImageBackground,
  Button
} from 'react-native';
import SocketIOClient from 'socket.io-client';
import {createStackNavigator} from 'react-navigation';

class HomeScreen extends Component {

  // socket = SocketIOClient('http://192.168.178.60:8080');

  render() {
    return (<ImageBackground source={require('./Assets/KluftcallBackground.png')} style={{
        justifyContent: "center",
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'column'
      }}>
      <View style={{marginBottom: 10}}>
        <Button title="Create Lobby" color="pink" onPress={() => this.props.navigation.navigate('CreateLobby')}/>
      </View>
      <Button title="Join Lobby" color="pink" onPress={() => this.props.navigation.navigate('JoinLobby')}/>
    </ImageBackground>);
  }
}

class CreateLobbyScreen extends Component {
  render() {
    return (<View style={{
        justifyContent: "center",
        flex: 1,
        alignItems: "center"
      }}>
      <Text>CreateLobby Screen</Text>
    </View>);
  }
}

class JoinLobbyScreen extends Component {
  render() {
    return (<View style={{
        justifyContent: "center",
        flex: 1,
        alignItems: "center"
      }}>
      <Text>JoinLobby Screen</Text>
    </View>);
  }
}

const RootStack = createStackNavigator({
  Home: HomeScreen,
  CreateLobby: CreateLobbyScreen,
  JoinLobby: JoinLobbyScreen
}, {initialRouteName: 'Home'});

export default class App extends React.Component {
  render() {
    return <RootStack/>;
  }
}
