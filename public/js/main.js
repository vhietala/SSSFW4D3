'use strict';
const socket = io();

const setUsername = () => {
  socket.emit('setUsername', document.getElementById('user').value);
};
let user;

const sendMessage = () => {
  const msg = document.getElementById('input').value;
  if (msg) {
    socket.emit('msg', {message: msg, user: user});
  }
};

socket.on('newmsg', (data) => {
  if (user) {
    document.getElementById('message-container').innerHTML += '<div><b>' +
        data.user + '</b>: ' + data.message + '</div>';
  }
});