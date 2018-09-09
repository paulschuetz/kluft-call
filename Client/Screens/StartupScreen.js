import React, {Component} from 'react'
import {Text, ImageBackground, ActivityIndicator} from 'react-native';
import {getUsername, getUserId} from '../clientStorage';
import {getUser} from '../ServerConnection/ServerApi';

export default class StartupScreen extends Component{

    constructor(props){
        super(props);
        this.state = {
            loadingText : "Initializing Startup",
            isLoading : true,
        }
    }

    async componentDidMount(){
        console.log("StartUpScreen!!!")
        this.setState({loadingText: "Retrieving User Data..."})
        const username = await getUsername();
        const userId = await getUserId();
        setTimeout(() => {
            this.setState({loadingText: "Logging in to Server..."})
            getUser(userId)
            .then(user => {
                this.setState({isLoading:false})
                if(user && user.name === username){
                    this.props.navigation.navigate('Home');
                }
                else{
                    this.props.navigation.navigate('Register');
                }
            })
            .catch(err => {
                this.props.navigation.navigate('Register');
            });
        }, 1000)
    }

    
    render(){
        return (
            <ImageBackground source={require('../Assets/KluftcallBackground.png')} style={{
                justifyContent: "center",
                width: '100%',
                height: '100%',
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="white" animating={true} style={{
            opacity: this.state.isLoading
                ? 1
                : 0
            }}/>
            <Text style={{color:"white"}}>{this.state.loadingText}</Text>
            </ImageBackground>
        );
    }
}