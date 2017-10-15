const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

//register connectin event:
io.on('connection', (socket) => {
  console.log('New user connected');





  //emit custom event, index.js is ready for newEmail already
  // socket.emit('newEmail', {
  //   from: 'tcamper97@gmail.com',
  //   text: "Sah dude",
  //   createdAt: 234
  // });

  // socket.on('createEmail', (newEmail) => {
  //   console.log(newEmail);
  // });

// socket.emit for single connection
  // socket.emit('newMessage', {
  //   from: 'tonyServer',
  //   text: 'this is a message sent from server',
  //   createdAt: 123
  // });

  socket.on('join', (params, callback) => {

    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    if (users.nameIsTaken(params.name, params.room)) {
      return callback('Name has been taken! Please choose another.');
    }

    socket.join(params.room.toLowerCase());
    users.removeUser(socket.id); // remove any users already with this id
    users.addUser(socket.id, params.name, params.room);
    // socket.leave(params.room); to leave room

    // io.emit -> emits to every connected user
    // socket.broadcast.emit -> emits to everyone but current user
    // socket.emit -> emits to one user
    // io.to(room name).emit -> emits to everyone in room
    // socket.broadcast.to(room name).emit ->emits to everyone in room but current user

    io.to(params.room).emit('updateUserList', users.getUserList(params.room.toLowerCase()));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room.toLowerCase()).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      // io.emit for sending to every connection
      io.to(user.lowerCaseRoom).emit('newMessage', generateMessage(user.name, message.text));
    }


    callback('This is from the server');
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  //if the client closes tab
  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

server.listen(port, console.log(`Server up on port ${port}`));
