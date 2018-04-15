'use strict';
const socket = io();

const user = document.getElementById('user');
const msg = document.getElementById('input');

const username = user.value;

const setUsername = () => {
  socket.emit('setUsername', user.value);
  this.username = user.value;
};

const sendMessage = () => {
  if (msg.value) {
    socket.emit('msg', {message: msg.value, user: this.username});
  }
};

socket.on('newmsg', (data) => {
  if (user.value) {
    document.getElementById('message-container').innerHTML += '<div><b>' +
        data.user + '</b>: ' + data.message + '</div>';
  }
});