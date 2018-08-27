var models = require('./models')
var mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/TestDb')

// drop tables
Promise.all(
    [
      models.User.remove({}, function (err) {
        console.log('User Table removed')
      }), models.Game.remove({}, function (err) {
        console.log('Game Table removed')
      }), models.GameType.remove({}, function (err) {
        console.log('GameType Table removed')
      }), models.Lobby.remove({}, function (err) {
        console.log('Lobby Table removed')
      })
    ]
  )
  .then(function () {
    // fill tables
    var pablo = new models.User({
      name: "pablo",
      password: "secret"
    })
    pablo.save().then(user => console.log("User created: " + user.id))

    var luki = new models.User({
      name: "luki",
      password: "secret"
    })
    luki.save().then(user => console.log("User created: " + user))

    var summonersRift = new models.GameType({
      name: "Summoners Rift",
      numberOfPlayersAllowed: 5
    })
    summonersRift.save().then(gameType => console.log("GameType created: " + summonersRift))

    var league = new models.Game({
      name: "League of Legends",
      gameType: [summonersRift]
    })
    league.save().then(league => console.log("Game created: " + league))

    var duo = new models.GameType({
      name: "Duo",
      numberOfPlayersAllowed: 2
    });
    duo.save().then(duo => console.log("GameType created: " + duo));

    var squad = new models.GameType({
      name: "Squad",
      numberOfPlayersAllowed: 4
    });
    squad.save().then(squad => console.log("GameType created: " + squad));

    var fortnite = new models.Game({
      name: "Fortnite Battle Royale",
      gameType: [duo, squad]
    });
    fortnite.save().then(fortnite => console.log("Game created: " + fortnite));

    var pabloSuchtFreunde = new models.Lobby({
      game: league,
      lobbyMembers: [{
        userName: pablo.name
      }],
      invitedUsers: [{
        userName: luki.name
      }]
    })
    pabloSuchtFreunde.save().then(console.log("Lobby created: " + pabloSuchtFreunde))

    var lukiSuchtAuchFriendsToZock = new models.Lobby({
      game: league,
      lobbyMembers: [{
        userName: luki.name
      }]
    })
    lukiSuchtAuchFriendsToZock.save().then(console.log("Lobby created: " + lukiSuchtAuchFriendsToZock))
  })