var socket = io();

socket.on('connect', function () {
  console.log("Connected to Server");

  // socket.emit('createEmail', {
  //   to: 'tony@gargiulo.com',
  //   text: 'what up'
  // });

  // socket.emit('createMessage', {
  //   from: 'tonyClient',
  //   text: 'sent from client'
  // });
});

socket.on('newMessage', function (message) {
  console.log(message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('disconnect', function () {
  console.log("Disconnected from server");
});


jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});

//this happens when server emits newEmail event
// socket.on('newEmail', function (email) {
//   console.log('New email', email);
// });
