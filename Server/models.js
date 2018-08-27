var mongoose = require('mongoose')
var swaggerMongoose = require('swagger-mongoose');
var fs = require('fs')

var swagger = fs.readFileSync('./api/swagger/swagger.json', "utf8");

var models = swaggerMongoose.compile(swagger).models;

models.User.schema.path('name').validate({
  isAsync:true,
  validator: function(value, callback){
      models.User.findOne({name:value}, function(err, user){
        if(user) callback(false)
        callback(true)
      });
  },
  message: 'There is already an user with this name'
})

exports.User = models.User;
exports.Game = models.Game;
exports.GameType = models.GameType;
exports.Lobby = models.Lobby;
