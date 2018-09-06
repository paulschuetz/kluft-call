import React, {
    Component
} from 'react';
import {
    FlatList,
    Text,
    View,
    BackHandler
} from 'react-native';
import { Button } from 'react-native-elements';

import SocketClient from 'socket.io-client'

import {SERVER_IP, SERVER_PORT} from '../constants';
import {leaveLobby} from '../ServerConnection/ServerApi';
import {getUserId} from '../clientStorage';
import {getSocket} from '../ServerConnection/Socket'


export default class LobbyScreen extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            lobby: this.props.navigation.state.params.lobby,
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

        // configure socket events
        let socket = getSocket();
        console.log("mounted lobbyscreen with socket: " +  socket.id)
        // join room of lobby
        socket.emit('join lobby', this.state.lobby)
        // if someone joined the lobby update the lobby data
        socket.on('update', (lobby) => {
            console.log("socket " +socket.id +": user joined lobby. Lobby now looks like " + JSON.stringify(lobby));
            // overwrite lobby element and re-render;
            this.setState({lobby: lobby});
        });
        
    }

    componentWillUnmount(){
        let socket = getSocket();
        // remove listeners !!!
        socket.off('update')
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }

    leaveLobby = async() => {
        // 1. Delete User from Lobby from Server (if it was the last user delete lobby);
        const lobbyId = this.state.lobby._id;
        const userId = await getUserId();
        const newLobby = await leaveLobby(lobbyId, userId);
        // 2. Send lobby-users a message someone has leaved the lobby -> update their list of users
        let socket = getSocket();
        socket.emit('leave lobby');
        // 3. Go back to Join-Lobby Screen?
        this.props.navigation.pop(1);
    }

    render() {
        return ( 
            <View style = {{flex: 1, flexDirection: 'column', justifyContent: "center", alignItems: "center", marginTop:26}}>
                <Text>Lobby {this.state.lobby._id}</Text>
                <FlatList
                    data={this.state.lobby.lobbyMembers}
                    renderItem={({item}) => (<Text> {item.userName} </Text>)}
                    keyExtractor = {(item, index) => item._id}
                />
                <Button title="Leave Lobby" onPress={()=>this.leaveLobby()} containerViewStyle={{width: '100%', marginLeft: 0, marginRight:0}}/>
            </View>
        );
    }

}