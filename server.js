'use strict';
const express=require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

const users = [];
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('setUsername', (data) => {
    if (users.indexOf(data) > -1) {
      users.push(data);
      socket.emit('userSet', {username: data});
    } else {
      socket.emit('userExists', data +
          ' username is taken! Try some other username.');
    }
  });

  socket.on('msg', (data) => {
    //Send message to everyone
    io.sockets.emit('newmsg', data);
  })
});

http.listen(3000, () => {
  console.log('listening on localhost:3000');
});