import {AsyncStorage} from 'react-native'

export const persistUsername = (username) => {
    if(username===null || username==='undefined') reject()
    return AsyncStorage.setItem('username', username);
}

export const getUsername = async() => {
  let username;
  try {
    username = await AsyncStorage.getItem('username');
    if (username === null) {
      username = "Player";
    }
  } catch (error) {
    username = "Player"
  }
  return username;
}
