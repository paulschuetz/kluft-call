import React, { Component } from 'react';
import { AppRegistry, View, Text, ImageBackground } from 'react-native';

export default class FlexDimensionsBasics extends Component {
  render() {

    return (
      <ImageBackground source={require('./Assets/KluftcallBackground.png')} style={{width: '100%', height: '100%'}}>
        <Text>Inside</Text>
      </ImageBackground>
    );
  }
}
