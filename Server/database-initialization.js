var models = require('./models')
var mongoose = require('mongoose')
var Promise = require('bluebird');

mongoose.Promise = Promise
mongoose.connect('mongodb://localhost:27017/TestDb')

createDatabase();

async function createDatabase(){
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
  ).then(async() => {
    let pablo = new models.User({
      name: "pablo",
      password: "secret"
    });

    pablo = await pablo.save();
    console.log("User created: " + pablo)

    var luki = new models.User({
      name: "luki",
      password: "secret"
    })
    luki = await luki.save()
    console.log("User created: " + luki)

    var summonersRift = new models.GameType({
      name: "Summoners Rift",
      numberOfPlayersAllowed: 5
    })
    summonersRift = await summonersRift.save()
    console.log("GameType created: " + summonersRift)

    var duo = new models.GameType({
      name: "Duo",
      numberOfPlayersAllowed: 2
    });
    duo = await duo.save()
    console.log("GameType created: " + duo)

    var squad = new models.GameType({
      name: "Squad",
      numberOfPlayersAllowed: 4
    });
    squad = await squad.save()
    console.log("GameType created: " + squad)

    var league = new models.Game({
      name: "League of Legends",
      gameType: [summonersRift]
    })
    league =  await league.save()
    console.log("Game created: " + league)

    var fortnite = new models.Game({
      name: "Fortnite Battle Royale",
      gameType: [duo, squad]
    });
    Fortnite = await fortnite.save();
    console.log("Game created: " + fortnite)

    var pabloSuchtFreunde = new models.Lobby({
      game: league,
      lobbyMembers: [{
        _id: pablo._id,
        userName: pablo.name
      }],
      invitedUsers: [{
        _id: pablo._id,
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
}

// // drop tables
// Promise.all(
//     [
//       models.User.remove({}, function (err) {
//         console.log('User Table removed')
//       }), models.Game.remove({}, function (err) {
//         console.log('Game Table removed')
//       }), models.GameType.remove({}, function (err) {
//         console.log('GameType Table removed')
//       }), models.Lobby.remove({}, function (err) {
//         console.log('Lobby Table removed')
//       })
//     ]
//   )
//   .then(() => {
//     // fill tables
//     var pablo = new models.User({
//       name: "pablo",
//       password: "secret"
//     })
//     let savePablo = pablo.save().then(user => console.log("User created: " + user))
  
//     var luki = new models.User({
//       name: "luki",
//       password: "secret"
//     })
//     let saveLuki = luki.save().then(user => console.log("User created: " + user))

//     var summonersRift = new models.GameType({
//       name: "Summoners Rift",
//       numberOfPlayersAllowed: 5
//     })
//     let saveSummonersRift = summonersRift.save().then(gameType => console.log("GameType created: " + summonersRift))

//     var duo = new models.GameType({
//       name: "Duo",
//       numberOfPlayersAllowed: 2
//     });
//     var saveDuo = duo.save().then(duo => console.log("GameType created: " + duo));

//     var squad = new models.GameType({
//       name: "Squad",
//       numberOfPlayersAllowed: 4
//     });
//     var saveSquad = squad.save().then(squad => console.log("GameType created: " + squad));
//     // bis hier alles chillo

//     Promise.join(savePablo, saveLuki, saveSummonersRift, saveDuo, saveSquad, 
//       function(pablo, luki, summonersRift, duo, squad){
//         console.log("PABLO: " + pablo)
//         var league = new models.Game({
//           name: "League of Legends",
//           gameType: [summonersRift]
//         })
//         let saveLeague = league.save().then(league => console.log("Game created: " + league))
    
//         var fortnite = new models.Game({
//           name: "Fortnite Battle Royale",
//           gameType: [duo, squad]
//         });
//         let saveFortnite = fortnite.save().then(fortnite => console.log("Game created: " + fortnite));
        
//         Promise.join(saveLeague, saveFortnite, function(league, fortnite){
//           var pabloSuchtFreunde = new models.Lobby({
//             game: league,
//             lobbyMembers: [{
//               userName: pablo.name
//             }],
//             invitedUsers: [{
//               userName: luki.name
//             }]
//           })
//           pabloSuchtFreunde.save().then(console.log("Lobby created: " + pabloSuchtFreunde))
      
//           var lukiSuchtAuchFriendsToZock = new models.Lobby({
//             game: league,
//             lobbyMembers: [{
//               userName: luki.name
//             }]
//           })
//           lukiSuchtAuchFriendsToZock.save().then(console.log("Lobby created: " + lukiSuchtAuchFriendsToZock))
//         })
//       })
//   })