'use strict';
var models = require('../models')
var Promise = require('bluebird')

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
      if(err) reject({"error": "User already exists!"})
      else resolve(newUser)
    })
  })
}


exports.createLobby = function(lobby) {
  console.log(`createLobby(${JSON.stringify(lobby)})`);
  return new Promise(function(resolve, reject) {
    models.Lobby.create(lobby, function(err, newLobby){
      if(err) reject({"error": "Lobby already exists!"});
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
      if (err) reject(err)
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
      if (err) reject(err)
      else{
        resolve(result);
      }
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
          new:true
        }, 
        function(err, updatedLobby){
          if (err){
            console.log("error " +  JSON.stringify(err))
            reject(err)
          }
          resolve(updatedLobby)
        }
      );
    })
    .catch(err => {
      console.log("ERROR: " + JSON.stringify(err))
      reject(err)
    })
  });
}

/**
 * get list of users
 * get collection of users
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
        rejecct(err)
      else
        resolve(users)
    })
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

function getUser(userId) {
  console.log(`getUser(userId=${userId})`)
  return new Promise(function(resolve, reject) {
    models.User.findById(userId, function(err, user) {
      if (err) reject(err)
      resolve(user)
    })
  })
}