var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/css/:stylesheet', function(req, res) {
  res.sendFile(__dirname + '/css/' + req.params.stylesheet);
});

io.on('connection', function(socket) {
  socket.broadcast.emit('room message', 
    'User ' + socket.id + ' has joined the room.');

  socket.on('disconnect', function() {
    socket.broadcast.emit('room message',
      'User ' + socket.id + ' has left the room.');
  });

  socket.on('chat message', function(msg) {
    io.emit('chat message', socket.id + ': ' + msg);
  });

});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
