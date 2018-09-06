import React, { Component } from 'react';
import {
  Button,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Promise from 'bluebird';

import Swiper from 'react-native-swiper';

import {getUsername, getUserId} from '../clientStorage'
import {getGames, createLobby} from '../ServerConnection/ServerApi'

export default class CreateLobbyScreen extends Component {

  constructor(props){
    super(props);
    this.state = 
    {
      games: [{_id: 1, name: "League of Legends", gameType:[]}],
      displayedGameTypes: [],
      currentGameIndex: 0,
      currentGameTypeIndex: 0
    };
  }

  componentDidMount(){
    this.fetchAvailableGames();
  }

  fetchAvailableGames = async() => {
      const games = await getGames(0, 100);
      this.setState({games: games})
  }

  handleGameSwipe = (index) => {
    console.log("gameSwipe: " + index)
    this.setState({currentGameIndex: index});
  }

  handleGameTypeSwipe = (index) => {
    console.log("handle gameTypeSwipe: " + index);
    this.setState({currentGameTypeIndex: index});
  }

  renderGameSwiper = () => {
    const games = this.state.games;
    const currentGameIndex = this.state.currentGameIndex;
    const gameViews= games.map(game=>{
      return(<View style={styles.slide1} key={game._id}><Text style={styles.text}>{game.name}</Text></View>)
    });
    const gamesSwiper = <Swiper key={games.length} loop={false} onIndexChanged={this.handleGameSwipe} style={styles.wrapper} showsButtons={true}>{gameViews}</Swiper>
    return gamesSwiper;
  }
  
  renderGameTypeSwiper = () => {

    const currentGameIndex = this.state.currentGameIndex;
    const gameTypes = this.state.games[currentGameIndex].gameType;

    const gameTypeViews= gameTypes.map(gameType=>{
      return(<View style={styles.slide3} key={gameType._id}><Text style={styles.text}>{gameType.name}</Text></View>)
    });
    const gamesTypeSwiper = <Swiper key={gameTypes.length} loop={false} onIndexChanged={this.handleGameTypeSwipe} style={styles.wrapper} showsButtons={true}>{gameTypeViews}</Swiper>
    return gamesTypeSwiper;
  }

  handleButtonClick = async() => {
    gameIndex = this.state.currentGameIndex;
    gameTypeIndex = this.state.currentGameTypeIndex;
    // clone object to modify it without changing state
    let game = Object.assign({}, this.state.games[gameIndex]);
    delete game._id;
    game.gameType = [game.gameType[gameTypeIndex]];

      
    const userName = await getUsername();
    const userId = await getUserId();
    const user = {_id:userId, userName: userName};
    const lobby = {"game":game, "invitedUsers":[], "lobbyMembers":[user]};
    
    createLobby(lobby)
    .then(lobby => {
      this.props.navigation.navigate('Lobby', {"lobby": lobby})
    })
    .catch(err => console.log("something went wrong while creating the lobby: " + JSON.stringify(err)));
  }
  
  render(){
    return (
    <View style={{marginTop: 26, flex:1, flexDirection: 'column'}}>
      <Text style={{textAlign: 'center'}}>Choose the Game</Text>
      {this.renderGameSwiper()}
      <Text style={{textAlign: 'center'}}>Choose the Gametype</Text>
      {this.renderGameTypeSwiper()}
      <Button
        onPress= {this.handleButtonClick}
        title="Let's game"
        color="#841584"
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
})