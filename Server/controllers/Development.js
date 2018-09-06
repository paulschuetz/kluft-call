'use strict';

var utils = require('../utils/writer.js');
var Development = require('../service/DevelopmentService');
var Promise = require('bluebird');

module.exports.createUser = function createUser(req, res, next) {
  var user = req.swagger.params['user'].value;
  Development.createUser(user)
    .then(function (response) {
      utils.writeJson(res, response, 201);
    })
    .catch(function (error) {
      utils.writeJson(res, error, error.status)
    });
};

module.exports.getGames = function getGames (req, res, next) {
  console.log("get games")
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Development.getGames(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      utils.writeJson(res, error, error.status);
    });
};

module.exports.getLobbies = function getLobbies(req, res, next){
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Development.getLobbies(offset, limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      utils.writeJson(res, error, error.status);
    });
}

module.exports.createLobby = function getLobbies(req, res,next){
  var lobby = req.swagger.params['lobby'].value;
  Development.createLobby(lobby)
    .then(function (response) {
      console.log("Lobby: " + JSON.stringify(response));
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      utils.writeJson(res, error, error.status);
    });
}

module.exports.getLobby = function getLobby (req, res, next) {
  var id = req.swagger.params['id'].value;
  Development.getLobby(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      utils.writeJson(res, error, error.status);
    });
};

module.exports.getUsers = function getUsers (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Development.getUsers(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      utils.writeJson(res, error, error.status);
    });
};

module.exports.joinLobby = function joinLobby (req, res, next) {
  var id = req.swagger.params['id'].value;
  var user = req.swagger.params['user'].value;
  Development.joinLobby(id, user.userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      utils.writeJson(res, error, error.status);
    });
};

module.exports.leaveLobby = function leaveLobby (req, res, next) {
  var id = req.swagger.params['id'].value;
  var userId = req.swagger.params['userId'].value;
  Development.leaveLobby(id, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      utils.writeJson(res, error, error.status);
    });
};

