const socketIo = require('socket.io');

let io;

function setupSocket(server) {
  io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chatMessage', (msg) => {
      console.log('Message received: ', msg);
      io.emit('chatMessage', msg); // Broadcast message to all clients
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
}

module.exports = { setupSocket, io };
