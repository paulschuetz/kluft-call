## Overview
Server managing database operations and business logic. Handles client's REST-API requests and websocket connections.

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

Install swagger-cli:
```
$npm install -g swagger
```

```
$swagger project edit
```

```
and open "http://localhost:8080/docs"
```
