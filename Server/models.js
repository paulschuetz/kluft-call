var mongoose = require('mongoose')
var swaggerMongoose = require('swagger-mongoose');
var fs = require('fs')

var swagger = fs.readFileSync('swagger.json', "utf8");

var models = swaggerMongoose.compile(swagger).models;

exports.User = models.User;
exports.Game = models.Game;
exports.GameType = models.GameType;
exports.Lobby = models.Lobby;
