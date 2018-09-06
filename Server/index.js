'use strict';

var fs = require('fs'),
  path = require('path'),
  http = require('http'),
socketio = require('socket.io');

var bodyParser = require('body-parser');
var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = 8080;
var mongoose = require('mongoose')

var DevelopmentService = require('./service/DevelopmentService');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// set up db connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/TestDb')

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname, './api/swagger/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function(middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  var server = http.createServer(app).listen(serverPort, function() {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });

  // socket connection
  var websocket = socketio(server);
  websocket.on('connection', (socket) => {
    socket.on('join lobby', (lobby) => {
      const roomId = lobby._id;
      console.log(`socket ${socket.id} joins room/lobby ${roomId}`)
      socket.join(roomId);
      socket.to(roomId).emit("update", lobby);
    });
    socket.on('leave lobby', () => {
      const roomId = Object.keys(socket.rooms).filter(item => item != socket.id);
      DevelopmentService.getLobby(roomId)
      .then(lobby => {
        // update lobby data of every lobby member except the sender
        socket.to(roomId).emit("update", lobby);
        socket.leave(roomId);
      })
    })
    socket.on('disconnect',(reason)=>{
      console.log(`socket ${socket.id} disconnected for reason: ${reason}`);
    })
  });
});
