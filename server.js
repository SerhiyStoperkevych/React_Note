const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

mongoose.connect('mongodb://localhost:27017/collaborativeStory', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

let storyContent = "";

io.on('connection', (socket) => {
  socket.emit('load', storyContent);

  socket.on('edit', (content) => {
    storyContent = content;
    socket.broadcast.emit('update', storyContent);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
