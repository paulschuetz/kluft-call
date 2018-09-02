import fetchWithTimeout from '../Helper/FetchWithTimeout.js'
import Promise from 'bluebird';

const serverPort = 8080
const serverIp =  "192.168.178.60"
const serverUrl = `http://${serverIp}:${serverPort}/supreme-winfos/kluft-call/1.0.0`
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
    .then(lobby => resolve(lobby))
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

export {registerUser, getLobbies, getGames, createLobby, joinLobby}
