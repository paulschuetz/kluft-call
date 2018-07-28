var models = require('./models')
var mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/TestDb')

// drop tables
Promise.all(
  [models.User.remove({}, function(err) {
    console.log('User Table removed')
  }), models.Game.remove({}, function(err) {
    console.log('Game Table removed')
  }), models.GameType.remove({}, function(err) {
    console.log('GameType Table removed')
  }), models.Lobby.remove({}, function(err) {
    console.log('Lobby Table removed')
  })]).then(function() {
  // fill tables
  var pablo = new models.User({name: "pablo", password: "secret"})
  console.log("THIS IS THE ID: " + pablo.id)
  pablo.save().then(user => console.log("User created: " + user.id))

  var luki = new models.User({name: "luki", password: "secret"})
  luki.save().then(user => console.log("User created: " + user))

  var summonersRift = new models.GameType({name: "Summoners Rift", numberOfPlayersAllowed: 5})
  summonersRift.save().then(gameType => console.log("GameType created: " + summonersRift))

  var league = new models.Game({name: "League of Legends", gameType: summonersRift})
  league.save().then(league => console.log("Game created: " + league))

  var pabloSuchtFreunde = new models.Lobby({game: league, lobbyMembers: pablo, invitedUsers: luki})
  pabloSuchtFreunde.save().then(console.log("Lobby created: " + pabloSuchtFreunde))
})