'use strict';
var models = require('../models')
var mongoose = require('mongoose')
var swaggerMongoose = require('swagger-mongoose');
var fs = require('fs')
var bluePromise = require('bluebird')

/**
 * create new user
 *
 * user User the user to create (optional)
 * no response value expected for this operation
 **/
exports.createUser = function(user) {
  console.log(`createUser(${JSON.stringify(user)})`)
  return new Promise(function(resolve, reject) {
    models.User.create(user,function(err, newUser){
      if(err) reject(err)
      else resolve(newUser)
    })
  })
}

/**
 * get collection of games
 *
 * offset Integer The number of items to skip before starting to collect the result (optional)
 * limit Integer The number of items to return (optional)
 * returns List
 **/
exports.getGames = function(offset, limit) {
return new Promise(function(resolve, reject) {
  models.Game.find().skip(offset).limit(limit).exec(function(err, result) {
    if (err)
      reject(err)
    resolve(result)
  })
});
}

/**
 * get a lobby
 * get a lobby
 *
 * id Integer the lobby id
 * returns Lobby
 **/
var getLobby = function(id) {
return new Promise(function(resolve, reject) {
  models.Lobby.findById(id, function(err, lobby) {
    if (err) {
      console.log("Lobby error")
      reject(err)
    }
    resolve(lobby)
  })
})
};

exports.getLobby = getLobby;

/**
 * get list of users
 * get collection of users
 *
 * offset Integer The number of items to skip before starting to collect the result (optional)
 * limit Integer The number of items to return (optional)
 * returns List
 **/
exports.getUsers = function(offset, limit) {
return new Promise(function(resolve, reject) {
  models.User.find().skip(offset).limit(limit).exec(function(err, users) {
    if (err)
      rejecct(err)
    else
      resolve(users)
  })
});
}

var getUser = function(userId) {
return new Promise(function(resolve, reject) {
  models.User.findById(userId, function(err, user) {
    if (err)
      reject(err)
    resolve(user)
  })
})
}

/**
 * add a user to a lobby
 * add a user-reference to a lobby
 *
 * id Integer id of the lobby the user joins
 * user User userId of the user joining the group (optional)
 * returns Lobby
 **/
exports.joinLobby = function(id, user) {
console.log(`joinLobby(lobbyId:${id},userId:${user.userId})`)
return new Promise(function(resolve, reject) {
  return bluePromise.join(getLobby(id), getUser(user.userId), function(lobby, user) {
    console.log("lobby: " + lobby);
    console.log("user: " + user)
    return models.Lobby.findOneAndUpdate({
      _id: id
    }, {
      "$addToSet": {
        "lobbyMembers": user
      }
    }, {new:true}, function(err, updatedLobby) {
      if (err)
        reject(err)
      console.log(updatedLobby)
      resolve(updatedLobby)
    })
  })
});
}
