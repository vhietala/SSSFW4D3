'use strict';
const socket = io();

const user = document.getElementById('user');
const msg = document.getElementById('input');

const setUsername = () => {
  socket.emit('setUsername', user.value);
};

const sendMessage = () => {
  if (msg.value) {
    socket.emit('msg', {message: msg.value, user: user.value});
  }
};

socket.on('newmsg', (data) => {
  if (user.value) {
    document.getElementById('message-container').innerHTML += '<div><b>' +
        data.user + '</b>: ' + data.message + '</div>';
  }
});