import React, {Component} from 'react';
import {ActivityIndicator, Alert, AppRegistry, View, Text, ImageBackground, Button, TextInput, StyleSheet} from 'react-native';
import SocketIOClient from 'socket.io-client';
import {createStackNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements'

const serverPort = 8080
const serverIp =  "192.168.178.60"
const serverUrl = `http://${serverIp}:${serverPort}/supreme-winfos/kluft-call/1.0.0`
const userEndpoint = serverUrl + "/users"


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
      <View style={{
          marginBottom: 10
        }}>
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

// TODO text validation while typing
class RegisterUserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: false}
  }

  render() {

    var register = () => {

      this.setState(()=>{
        return {isLoading : true}
      })

      // try to save user via rest-call
      fetch(userEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          name: this.state.username,
          password: this.state.password
        })
      })
      .then(response=>{
        if(response.status>204) reject();
        return response.json()
      })
      .then(responseJson => {
        console.log("success: " + JSON.stringify(responseJson))
        // stop spinner
        this.setState(()=>{
          return {isLoading: false}
        })
        // Go to Home Screen
        this.props.navigation.navigate('Home')
      })
      .catch(()=> {
        // stop spinner
        this.setState(()=>{
          return {isLoading: false};
        })
      })
      // if success save name on clients-device
      // if success go to home-view
    }

    return (
      <ImageBackground style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      }} source={require('./Assets/KluftcallBackground.png')}>
        <View style={{flexDirection: 'row', height: 50, backgroundColor: 'powderblue'}}>
          <Icon name='user' type='entypo' size={30} color="#000" style={styles.searchIcon}/>
            <TextInput
              style={styles.input}
              textContentType="username"
              placeholder="your username"
              onChangeText={(uname) => {this.setState({username: uname})}}
              underlineColorAndroid="transparent"
            />
        </View>
        <View style={{flexDirection: 'row', height: 50, backgroundColor: 'skyblue'}}>
          <Icon name='key' type='entypo' size={30} color="#000" style={styles.searchIcon}/>
            <TextInput
              style={styles.input}
              textContentType="password"
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              placeholder="your password"
              onChangeText={(pw) => {this.setState({password: pw})}}
            />
        </View>
        <View style={{height: 50}}>
            <Button title="Register account" color="pink" onPress={register}/>
        </View>
        <ActivityIndicator size="large" color="white" animating={true} style = {{ opacity : this.state.isLoading ? 1 : 0 }} />
      </ImageBackground>
    );
  }
}

const RootStack = createStackNavigator({
  Home: HomeScreen,
  CreateLobby: CreateLobbyScreen,
  JoinLobby: JoinLobbyScreen,
  RegisterUser: RegisterUserScreen
}, {initialRouteName: 'RegisterUser', headerMode:'none'});

export default class App extends React.Component {
  render() {
    return <RootStack/>;
  }
}

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    paddingRight : 20
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242'
  }
});
