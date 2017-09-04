var socket = io();

socket.on('connect', function () {
  console.log("Connected to Server");

  // socket.emit('createEmail', {
  //   to: 'tony@gargiulo.com',
  //   text: 'what up'
  // });

  socket.emit('createMessage', {
    from: 'tonyClient',
    text: 'sent from client'
  });
});

socket.on('newMessage', function (message) {
  console.log(message);
});

socket.on('disconnect', function () {
  console.log("Disconnected from server");
});

//this happens when server emits newEmail event
// socket.on('newEmail', function (email) {
//   console.log('New email', email);
// });
