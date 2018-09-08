'use strict';
var models = require('../models')
var Promise = require('bluebird')
const {HttpError} = require('../Errors/HttpError');

/**
 * create new user
 *
 * user User the user to create (optional)
 * no response value expected for this operation
 **/
exports.createUser = function(user) {
  console.log(`createUser(${JSON.stringify(user)})`);
  return new Promise(function(resolve, reject) {
    models.User.create(user, function(err, newUser){
      if(err) reject(new HttpError("Failed creating new user. MongoDb error message: " + err, 400));
      else resolve(newUser)
    })
  })
}


exports.createLobby = function(lobby) {
  console.log(`createLobby(${JSON.stringify(lobby)})`);
  return new Promise(function(resolve, reject) {
    models.Lobby.create(lobby, function(err, newLobby){
      if(err) reject(new HttpError("Failed creating new lobby. MongoDb error message: " + err, 400));
      else resolve(newLobby);
    });
  });
}

/**
 * get collection of games
 *
 * offset Integer The number of items to skip before starting to collect the result (optional)
 * limit Integer The number of items to return (optional)
 * returns List
 **/
exports.getGames = function(offset, limit) {
  console.log(`getGame(offset=${offset}, limit=${limit})`);
  return new Promise(function(resolve, reject) {
    models.Game.find().skip(offset).limit(limit).exec(function(err, result) {
      if (err) reject(new HttpError("Failed fetching games. MongoDb error message: " + err, 400));
      resolve(result)
    })
  });
}

/**
 * 
 * @param {number} offset num of elements to skip
 * @param {number} limit num of elements to return
 * @returns {Promise} promise that returns {@link models.Lobby} if resolved
 */
exports.getLobbies = function(offset, limit) {
  console.log(`getLobbies(offset=${offset}, limit=${limit})`);
  return new Promise(function(resolve, reject) {
    models.Lobby.find().skip(offset).limit(limit).exec(function(err, result) {
      if (err) reject(new HttpError("Failed fetching lobbies. MongoDb error message: " + err, 400));
      else resolve(result);
    })
  });
  }

/**
 * add a user to a lobby
 * add a user-reference to a lobby
 *
 * id Integer id of the lobby the user joins
 * user User userId of the user joining the group (optional)
 * returns Lobby
 **/
exports.joinLobby = function(lobbyId, userId) {
  console.log(`joinLobby(lobbyId: ${lobbyId}, userId: ${userId})`);
  return new Promise(function(resolve, reject){
    Promise.join(getLobby(lobbyId), getUser(userId), function(lobby, user) {
      console.log("lobby: " + lobby);
      console.log("user: " + user)
      if(lobby === null || user === null){
        reject(new HttpError("Either lobbyId oder userId does not match a entity in the database. MongoDb error message: " + err, 400));
      };
      const userInRightFormat = {_id: user._id, userName: user.name};
      models.Lobby.findOneAndUpdate(
        {
          _id: lobbyId
        }, 
        {
          "$addToSet": {
            "lobbyMembers": userInRightFormat
          }
        }, 
        {
          new: true
        }, 
        function(err, updatedLobby){
          if (err){
            console.log("error " +  JSON.stringify(err))
            reject(new HttpError("Failed adding user to lobby. MongoDb error message: " + err, 400));
          }
          resolve(updatedLobby)
        }
      );
    })
    .catch(err => {
      reject(new HttpError("Failed adding user to lobby. MongoDb error message: " + JSON.stringify(err), 400));
    })
  });
}

// remove a user from the lobbyMembers Collection and ultimatively remove the lobby if the lobby is empty
exports.leaveLobby = function(lobbyId, userId){
  console.log(`leaveLobby(lobbyId=${lobbyId}, userId=${userId})`);
  return new Promise(function(resolve, reject){
      models.Lobby.findOneAndUpdate(
        {
          _id: lobbyId
        }, 
        {
          "$pull": {
            "lobbyMembers": {"_id": userId}
          }
        }, 
        {
          new:true
        }, 
        function(err, updatedLobby){
          if (err){
            reject(new HttpError("Failed deleting user from lobby. MongoDb error message: " + JSON.stringify(err), 400));
          }
          console.log(`deleted user ${userId} from lobby ${lobbyId}. New lobby member count: ${updatedLobby.lobbyMembers.length}/${updatedLobby.game[0].gameType[0].numberOfPlayersAllowed}`);
          // check if lobby is empty
          console.log("member count: " + updatedLobby.lobbyMembers.length)
          if(updatedLobby.lobbyMembers.length<1){
            models.Lobby.remove(
              {
                _id: lobbyId
              },
              function(err){
                if(err){
                  reject(new HttpError("Database error while deleting user from lobby. MongoDb error message: " + err, 400));
                }
                else{
                  console.log("successfully deleted lobby " + lobbyId);
                  resolve();
                }
              }
            )
          }
          resolve(updatedLobby)
        }
      );
  });
}

/**
 * get list of users
 *
 * offset Integer The number of items to skip before starting to collect the result (optional)
 * limit Integer The number of items to return (optional)
 * returns List
 **/
exports.getUsers = function(offset, limit) {
  console.log(`getUsers(offset=${offset}, limit=${limit})`);
  return new Promise(function(resolve, reject) {
    models.User.find().skip(offset).limit(limit).exec(function(err, users) {
      if (err)
        rejecct(new HttpError(`Database error while fetching users: ${err}`, 500))
      else
        resolve(users)
    })
  });
}


exports.getUser = function(id){
  console.log(`getUser(id=${id})`)
  return new Promise(function(resolve, reject) {
    models.User.findById(id, function(err, user) {
      if (err) reject(new HttpError(`Could not find user with _id ${id}: ${err}`, 400))
      resolve(user);
    });
  });
}

// HELPERS

function getLobby(id) {
  console.log(`getLobby(lobbyId=${id})`)
  return new Promise(function(resolve, reject) {
    models.Lobby.findById(id, function(err, lobby) {
      if (err) reject(err)
      resolve(lobby)
    })
  })
};

exports.getLobby = getLobby;