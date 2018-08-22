import fetchWithTimeout from '../Helper/FetchWithTimeout.js'
import Promise from 'bluebird';

const serverPort = 8080
const serverIp =  "192.168.178.60"
const serverUrl = `http://${serverIp}:${serverPort}/supreme-winfos/kluft-call/1.0.0`
// REST API endpoints
const userEndpoint = serverUrl + "/users"
const lobbyEndpoint = serverUrl + "/lobbies"

console.log("bin in ServerApi.js")

// user = {"username":"pablo", "password":"secret"}
function registerUser(user, timeout){
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
      if(response.status > 204){
        console.log("above 204")
        reject();
      }
      resolve();
    })
    .catch(err => {
      reject();
    })
  })
}

function getLobbies(offset, limit){
  return new Promise(function (resolve, reject){
    const url = `${lobbyEndpoint}?offset=${offset}&limit=${limit}`
    console.log("URL: " + url)
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

export {registerUser, getLobbies}
