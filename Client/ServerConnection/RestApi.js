import fetchWithTimeout from '../Helper/FetchWithTimeout.js'
import {UnsuccessfulRequestError, NetworkError} from '../Errors/Errors'

const serverPort = 8080
const serverIp =  "192.168.178.60"
const serverUrl = `http://${serverIp}:${serverPort}/supreme-winfos/kluft-call/1.0.0`
// REST API endpoints
const userEndpoint = serverUrl + "/users"


// user = {"username":"pablo", "password":"secret"}
function registerUser(user, timeout){
  // console.log("register user: " + user)
  return new Promise(function(resolve,reject){
    return fetchWithTimeout(userEndpoint, {
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
    .then(response=>{
      if(response.status > 204) reject(new UnsuccessfulRequestError());
    })
    .catch(err =>{
      console.log("bin im catch")
      reject(new NetworkError(err));
    })
  })
}

export {registerUser}
