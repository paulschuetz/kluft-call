import fetchWithTimeout from '../Helper/FetchWithTimeout.js'
import Promise from 'bluebird';
import {SERVER_IP, SERVER_PORT} from '../constants'

const serverUrl = `http://${SERVER_IP}:${SERVER_PORT}/supreme-winfos/kluft-call/1.0.0`
// REST API endpoints
const userEndpoint = serverUrl + "/users"
const lobbyEndpoint = serverUrl + "/lobbies"
const gamesEndpoint = serverUrl + "/games"

// user = {"username":"pablo", "password":"secret"}
registerUser = (user, timeout) => {
  console.log("register user: " +  JSON.stringify(user))
  return new Promise(function(resolve,reject){
    fetchWithTimeout(userEndpoint, {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        name: user.username,
        password: user.password
      })
    }, timeout)
    .then(response => {
      console.log("status: " + response.status)
      if(response.status != 201) reject();
      return response.json();
    })
    .then(user=> resolve(user))
    .catch(err => {
      console.log("ERROR: " + JSON.stringify(err));
      reject();
    })
  })
}

getLobbies = (offset, limit) => {
  return new Promise(function (resolve, reject){
    const url = `${lobbyEndpoint}?offset=${offset}&limit=${limit}`
    const timeout = 3000;
    const options = 
    {
      method: 'GET',
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      }
    };

    fetchWithTimeout(url, options, timeout)
    .then(response => {
      if(response.status != 200) reject();
      return response.json();
    })
    .then(lobbies => {
      resolve(lobbies)
    })
    .catch(err => {
      console.log("Error while fetching lobby data: " + JSON.stringify(err));
      reject(err);
    })
  })
}

function joinLobby(lobbyId, userId){
  return new Promise(function (resolve, reject){
    const url = `${lobbyEndpoint}/${lobbyId}/users`
    const timeout = 3000;
    const body = {"userId": userId};
    const options = 
    {
      method: 'PATCH',
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(body)
    };
    
    fetchWithTimeout(url, options, timeout)
    .then(response => response.json())
    .then(json=>{
      if(isErrorObject(json)){
        console.log(`Error while user ${userId} attempts to join lobby ${lobbyId}`);
        reject();
      }
      resolve(json);
    })
    .catch(err => reject(err))
  })
}

function createLobby(lobby){
  return new Promise(function(resolve, reject){

    const url = lobbyEndpoint;
    const timeout = 3000;
    const options = {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(lobby)
    };

    fetch(url, options)
    .then(response => response.json())
    .then(json => resolve(json))
    .catch(error => {
      console.log("Error: " + error)
      reject(error)
    });
  })
}

getGames = (offset, limit) => {
  return new Promise(function(resolve, reject){
    const url = `${gamesEndpoint}?offset=${offset}&limit=${limit}`;
    const timeout = 3000;
    const options = {
      method: 'GET',
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      }
    };
    fetchWithTimeout(url, options, timeout)
    .then(response=>{
      if(response.status != 200) reject();
      return response.json();
    })
    .then(lobbies => resolve(lobbies))
    .catch(err=>{
      console.log("error while fetching games: " + JSON.stringify(err));
      reject();
    })
  });
}

getUser = (userId) => {
  return new Promise(function(resolve, reject){
    const url = userEndpoint + '/' + userId;
    console.log('getUser: ' + url);
    const options = {
      method: 'GET',
      headers: {
        'Accept' : 'application/json',
      }
    }
    const timeout = 3000;
    fetchWithTimeout(url, options, timeout)
    .then(response=> response.json())
    .then(json => {
      if(isErrorObject(json)) reject();
      else resolve(json);
    })
    .catch(err => {
      console.log("something went wrong while fetching user " + userId + " from server: " +  err);
      reject();
    });
  });
}

leaveLobby = (lobbyId, userId) => {
  return new Promise(function(resolve, reject){
    const url = `${lobbyEndpoint}/${lobbyId}/users?userId=${userId}`
    console.log("leaveLobby: " + url);
    const timeout=3000;
    const options = {
      method: 'DELETE',
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      }
    };
    fetchWithTimeout(url, options, timeout)
    .then(response=> response.json())
    .then(json => {
      if(isErrorObject(json)){
        console.log(`error while leaving lobby ${lobbyId}: ${JSON.stringify(json)}`);
        reject();
      }
      console.log(`user ${userId} successfully left lobby ${lobbyId}.`)
      resolve(json);
    })
  })
}

// HELPER

/**
 * @returns boolean
 */
isErrorObject = (object) => {
  if(object.name){
    if(object.name.includes("Error") || object.name.includes("Exception")){
      if(object.status && object.status >= 400){
          return true;
      }
    }
  }
  return false;
}

export {registerUser, getLobbies, getGames, createLobby, joinLobby, leaveLobby, getUser}
