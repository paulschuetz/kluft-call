import fetchWithTimeout from '../Helper/FetchWithTimeout.js'
const Promise = require("bluebird");

const serverPort = 8080
const serverIp =  "192.168.178.60"
const serverUrl = `http://${serverIp}:${serverPort}/supreme-winfos/kluft-call/1.0.0`
// REST API endpoints
const userEndpoint = serverUrl + "/users"


// user = {"username":"pablo", "password":"secret"}
function registerUser(user, timeout){
  return new Promise(function(resolve,reject){
    fetchWithTimeout(userEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
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

export {registerUser}
