import React, {
    Component
} from 'react';
import {
    FlatList,
    Text,
    View,
    BackHandler
} from 'react-native';

import SocketClient from 'socket.io-client'
import { Button } from 'react-native-elements';
import {SERVER_IP, SERVER_PORT} from '../constants';


export default class LobbyScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lobby: this.props.navigation.state.params.lobby,
        };
    
        // socket connection
        const socketUrl = `http://${SERVER_IP}:${SERVER_PORT}`
        let socket = SocketClient(socketUrl).connect();
        // join room of lobby
        socket.on('connect', () => {
            socket.emit('join room', this.state.lobby)
        });
        // if someone joined the lobby uupdate the lobby data
        socket.on('new user joined', (lobby) => {
            console.log("user joined lobby. Lobby now looks like " + JSON.stringify(lobby));
            // overwrite lobby element and re-render;
            this.setState({lobby: lobby});
        });
        this.state.socket = socket;
    }

    componentDidMount() {
        console.log("mounting lobby screen")
        BackHandler.addEventListener('hardwareBackPress', ()=> true);
    }

    componentWillUnmount(){
        console.log("unmounting...")
        this.state.socket.close();
    }

    onBackButtonPressAndroid = () => {
        if (this.isSelectionModeEnabled()) {
          this.disableSelectionMode();
          return true;
        } else {
          return false;
        }
    };

    leaveLobby = () => {
        // 1. Delete User from Lobby from Server (if it was the last user delete lobby);
        // 2. Send lobby-users a message someone has leaved the lobby -> update their list of users
        // 3. Update lobby-list in join lobby screen
        // 4. Go back to Join-Lobby Screen?
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