## Overview
Server managing database operations and business logic. Handles client's REST-API requests and websocket connections.

### Setting up Database
1. Download and Install MongoDb Community Server without Atlas => https://www.mongodb.com/download-center?jmp=nav#community
2. Create the Folder C:\data\db
3. Go to C:\Program Files\MongoDB\Server\3.2\bin
4. start server:
```
$mongod 
``` 
server will by default start at port 27017

If you have issues starting the database: https://stackoverflow.com/questions/20796714/how-do-i-start-mongo-db-from-windows

### Install required dependecies
$ npm install

### Running the server
To run the server, run:

```
$npm start run
```

To view the Swagger UI interface:

```
run server and open "http://localhost:8080/docs"
```

### To edit REST endpoints and definitions

Install swagger-cli
```
$npm install -g swagger
```
and then
```
$swagger project edit
```
