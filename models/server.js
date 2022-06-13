//Servidor de express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Http server
    this.server = http.createServer(this.app);

    //Config sockets
    this.io = socketio(this.server, {
      /* config*/
    });
  }

  middlewares() {
    //desplegar el directorio público
    this.app.use(express.static(path.resolve(__dirname, '../public')));
  }

  configSockets() {
    new Sockets(this.io);
  }

  execute() {
    //init middlewares
    this.middlewares();

    //init sockets
    this.configSockets();

    //init server
    this.server.listen(this.port, () => {
      console.log('server corriente en puerto:', this.port);
    });
  }
}

module.exports = Server;
