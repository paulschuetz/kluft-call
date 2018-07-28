'use strict';
var models = require('../models')
var mongoose = require('mongoose')
var swaggerMongoose = require('swagger-mongoose');
var fs = require('fs')

/**
 * create new user
 *
 * user User the user to create (optional)
 * no response value expected for this operation
 **/
exports.createUser = function(user) {
  return new Promise(function(resolve, reject) {
    var newUser = new models.User(user)
    newUser.save().then(function(user){
      resolve(user)
    }).catch(function(err){
      reject(err)
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
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

/**
 * get a lobby
 * get a lobby
 *
 * id Integer the lobby id
 * returns Lobby
 **/
exports.getLobby = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "game": {
        "gameType": {
          "numberOfPlayersAllowed": 5,
          "name": "Summoners Rift"
        },
        "name": "Fortnite"
      },
      "lobbyMembers": [
        {
          "password": "very-secret",
          "name": "808Frittenbude"
        }, {
          "password": "very-secret",
          "name": "808Frittenbude"
        }
      ],
      "invitedUsers": [
        {
          "password": "very-secret",
          "name": "808Frittenbude"
        }, {
          "password": "very-secret",
          "name": "808Frittenbude"
        }
      ]
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [
      {
        "password": "very-secret",
        "name": "808Frittenbude"
      }, {
        "password": "very-secret",
        "name": "808Frittenbude"
      }
    ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
exports.joinLobby = function(id, user) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "game": {
        "gameType": {
          "numberOfPlayersAllowed": 5,
          "name": "Summoners Rift"
        },
        "name": "Fortnite"
      },
      "lobbyMembers": [
        {
          "password": "very-secret",
          "name": "808Frittenbude"
        }, {
          "password": "very-secret",
          "name": "808Frittenbude"
        }
      ],
      "invitedUsers": [
        {
          "password": "very-secret",
          "name": "808Frittenbude"
        }, {
          "password": "very-secret",
          "name": "808Frittenbude"
        }
      ]
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}
