'use strict';
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

const users = {};
const rooms = ['room1', 'room2', 'room3'];


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('room', (room) => {
    socket.join(room);
  });

  socket.on('setUsername', (username) => {
    socket.username = username;
    socket.room = 'room1';
    users[username] = username;
    socket.join('room1');
    socket.emit('newmsg', 'SERVER', 'you have connected to room1');
    socket.broadcast.to('room1').emit('newmsg', 'SERVER', username + ' has connected to this room');
    socket.emit('updaterooms', rooms, 'room1');
  });



  socket.on('msg', (data) => {
    //Send message to everyone
    io.sockets.in(socket.room).emit('newmsg', socket.username, data.message);
  });

  socket.on('switchRoom', (newroom) => {
    socket.leave(socket.room);
    socket.join(newroom);
    socket.emit('newmsg', 'SERVER', 'you have connected to '+ newroom);
    socket.broadcast.to(socket.room).emit('newmsg', 'SERVER', socket.username+' has left this room');
    socket.room = newroom;
    socket.broadcast.to(newroom).emit('newmsg', 'SERVER', socket.username+' has joined this room');
    socket.emit('updaterooms', rooms, newroom);
  });

  socket.on('disconnect', () => {
    delete users[socket.username];
    io.sockets.emit('updateusers', usernames);
    socket.broadcast.emit('newmsg', 'SERVER', socket.username + ' has disconnected');
    socket.leave(socket.room);
  });

});


http.listen(3000, () => {
  console.log('listening on localhost:3000');
});