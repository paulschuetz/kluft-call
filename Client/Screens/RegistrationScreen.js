import React, {Component} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  View,
  Text,
  ImageBackground,
  Button,
  TextInput,
  StyleSheet
} from 'react-native';
import {Icon} from 'react-native-elements';
import Promise from 'bluebird';
import {getUsername, persistUsername} from '../clientStorage.js';
import {registerUser} from '../ServerConnection/ServerApi.js';

const registerTimeout = 3000;

// TODO text validation while typing
export default class RegistrationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  // is invoked if user clicks 'Register' button
  register = () => {
    // indicate we are doing network stuff
    this.setState(() => {
      return {isLoading: true}
    });
    registerUser({username: this.state.username, password: this.state.password}, registerTimeout)
    .then(() => persistUsername(this.state.username))
    .then(()=>{
      this.setState(() => {
        return {isLoading: false};
      })
      console.log("Go to home")
      this.props.navigation.navigate('Home')
    })
    .catch(()=>{
      this.setState(() => {
        return {isLoading: false};
      })
    })
  }

  render() {
    return (
    <ImageBackground style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
      }} source={require('../Assets/KluftcallBackground.png')}>
      <View style={{
          flexDirection: 'row',
          height: 50,
          backgroundColor: 'powderblue'
        }}>
        <Icon name='user' type='entypo' size={30} color="#000" style={styles.searchIcon}/>
        <TextInput style={styles.input} textContentType="username" placeholder="your username" onChangeText={(uname) => {
            this.setState({username: uname})
          }} underlineColorAndroid="transparent"/>
      </View>
      <View style={{
          flexDirection: 'row',
          height: 50,
          backgroundColor: 'skyblue'
        }}>
        <Icon name='key' type='entypo' size={30} color="#000" style={styles.searchIcon}/>
        <TextInput style={styles.input} textContentType="password" underlineColorAndroid="transparent" secureTextEntry={true} placeholder="your password" onChangeText={(pw) => {
            this.setState({password: pw})
          }}/>
      </View>
      <View style={{
          height: 50
        }}>
        <Button title="Register account" color="pink" onPress={this.register}/>
      </View>
      <ActivityIndicator size="large" color="white" animating={true} style={{
          opacity: this.state.isLoading
            ? 1
            : 0
        }}/>
    </ImageBackground>);
  }
}

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  searchIcon: {
    paddingRight: 20
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
