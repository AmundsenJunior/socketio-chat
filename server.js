var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/css/:stylesheet', function(req, res) {
  res.sendFile(__dirname + '/css/' + req.params.stylesheet);
});

app.get('/js/:script', function(req, res) {
  res.sendFile(__dirname + '/js/' + req.params.script);
});

io.on('connection', function(socket) {
  socket.broadcast.emit('room message', 
    'User ' + socket.id + ' has joined the room.');

  socket.on('disconnect', function() {
    socket.broadcast.emit('room message',
      'User ' + socket.id + ' has left the room.');
  });

  socket.on('chat message', function(name, msg) {
    io.emit('chat message', name + ': ' + msg);
  });

});

http.listen(3000, function() {
  console.log('listening on *:3000');
});

