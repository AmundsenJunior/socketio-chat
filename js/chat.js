var socket = io();
var username;

$('form#enterName').submit(function() {
  username = $('#name').val();
  $('#name').val('');
  $(this).remove();
  $('.messages').toggle();
});

$('form#enterMessage').submit(function() {
  msg = $('#msg').val();
  socket.emit('chat message', username, msg);
  $('#msg').val('');
  return false;
});

socket.on('chat message', function(name, msg) {
  $('#messages').append($('<li>').text(name).text(msg));
});

socket.on('room message', function(msg) {
  $('#messages').append($('<li class="roomMsg">').text(msg));
});
