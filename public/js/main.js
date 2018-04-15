'use strict';
const socket = io.connect('/');

const user = document.getElementById('user');
const msg = document.getElementById('input');

const username = user.value;

const room = 'room1';

const setRoom = (newRoom) => {
  this.room = newRoom;
};

const setUsername = () => {
  socket.emit('setUsername', user.value);
  this.username = user.value;
};

const sendMessage = () => {
  if (msg.value) {
    socket.emit('msg', {message: msg.value, user: this.username});
  }
};

socket.on('connect', () => {
  socket.emit('room', room);
});

socket.on('newmsg', (username,data) => {
  if (user.value) {
    document.getElementById('message-container').innerHTML += '<div><b>' +
        username + '</b>: ' + data + '</div>';
  }
});

const switchRoom = (room) => {
  socket.emit('switchRoom', room);
};