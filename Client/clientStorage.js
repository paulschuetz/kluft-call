import {AsyncStorage} from 'react-native'

export const persistUserData = async(user) => {
  const userName = user.name;
  const userId = user._id;
  if(userName === 'undefined' || userId === 'undefined') throw new Error("empty input parameter");
  try{
    AsyncStorage.setItem("userName", userName);
    AsyncStorage.setItem("userId", userId);
  }
  catch(err){
    console.log("Failed writing user data to client storage: " + JSON.stringify(err));
  }
}

export const isRegistered = async() => {
  const userName = await getUsername();
  const userId = await getUserId();
  console.log(`userId: ${userId}, userName: ${userName}`)
  if(!userName || !userId) return false;
  return true;
}

export async function getUsername() {
    let username;
    try {
      username = await AsyncStorage.getItem('userName');
      if (username === null) {
        username = "Player";
      }
    } catch (error) {
      username = "Player"
    }
    return username;
}

export const getUserId = () => {
  return AsyncStorage.getItem('userId');
}

// Helper

const persistUserId = (userId) => {
  if(userId===null || userId==='undefined') throw new Error("no userId provided")
  return AsyncStorage.setItem('userId', userId);
}


const persistUsername = (username) => {
  if(username===null || username==='undefined') throw new Error("no username provided")
  return AsyncStorage.setItem('username', username);
}
  