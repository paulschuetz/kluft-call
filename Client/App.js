import React, {Component} from 'react';
import {Alert, AppRegistry, View, Text, ImageBackground, Button, TextInput, StyleSheet} from 'react-native';
import SocketIOClient from 'socket.io-client';
import {createStackNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements'

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

class RegisterUserScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
              onChangeText={(searchString) => {this.setState({searchString})}}
              underlineColorAndroid="transparent"
            />
        </View>
        <View style={{flexDirection: 'row', height: 50, backgroundColor: 'skyblue'}}>
          <Icon name='key' type='entypo' size={30} color="#000" style={styles.searchIcon}/>
            <TextInput
              style={styles.input}
              textContentType="password"
              onChangeText={(searchString) => {this.setState({searchString})}}
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              placeholder="your password"
            />
        </View>
        <View style={{height: 50}}>
            <Button title="Register account" color="pink" onPress={() => this.props.navigation.navigate('Home')}/>
        </View>
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
