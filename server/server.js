const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//register connectin event:
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chap app! :D',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'A new user joined the chat',
    createdAt: new Date().getTime()
  });

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

  socket.on('createMessage', (message) => {
    console.log(message);
    //broadcast emits to all sockets but the sender
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
    // io.emit for every connection
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });


  //if the client closes tab
  socket.on('disconnect', () => {
    console.log('Disconnected from client');
  });
});

server.listen(port, console.log(`Server up on port ${port}`));
