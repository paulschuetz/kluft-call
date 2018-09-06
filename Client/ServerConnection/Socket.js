import io from 'socket.io-client'
import {SERVER_IP, SERVER_PORT} from '../constants';


establishSocketConnection = () => {

    console.log("establishing connection")
    // socket connection
    const socketUrl = `http://${SERVER_IP}:${SERVER_PORT}`;
    this.socket = io(socketUrl);
    socket.on('connect', function(){
        console.log("connected")
    });

    return this.socket;
}

getSocket = () => {
    return this.socket;
}

export {establishSocketConnection, getSocket}