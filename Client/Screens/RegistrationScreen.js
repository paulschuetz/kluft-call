import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, View, Text, ImageBackground, Button, TextInput, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements'
import {getUsername, persistUsername} from '../persistence.js'

const serverPort = 8080
const serverIp =  "192.168.178.60"
const serverUrl = `http://${serverIp}:${serverPort}/supreme-winfos/kluft-call/1.0.0`
const userEndpoint = serverUrl + "/users"

// TODO text validation while typing
export default class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: false}
  }

  // class member
  // is invoked if user clicks 'Register' button
  register = () => {
      // indicate we are doing network stuff
      this.setState(()=>{
        return {isLoading : true}
      })
      // try to save user via REST-request
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
        if(response.status>204) throw new Error()
        return response.json()
      })
      .then(newUser => {
        persistUsername(newUser.name).then(()=>{
          console.log("I am here now")
          // stop spinner
          this.setState(()=>{
            return {isLoading: false};
          })
          // Go to Home Screen
          this.props.navigation.navigate('Home')
        })
      })
      .catch(err => {
        // stop spinner
        this.setState(()=>{
          return {isLoading: false};
        })
        console.log("error: " + err)
      })
    }

  render() {
    return (
      <ImageBackground style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      }} source={require('../Assets/KluftcallBackground.png')}>
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
            <Button title="Register account" color="pink" onPress={this.register}/>
        </View>
        <ActivityIndicator size="large" color="white" animating={true} style = {{ opacity : this.state.isLoading ? 1 : 0 }} />
      </ImageBackground>
    );
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
