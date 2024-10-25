// app.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const redisClient = require("./redisClient");
const connectDB = require("./db");
const Message = require("../src/models/message");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3000", // Next.js app
    origin: "*", // all
    methods: ["GET", "POST"],
  },
});

// Connect to MongoDB
connectDB();
redisClient.connect();

// Middleware
app.use(express.json());

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinRoom", ({ roomId, userId }) => {
    socket.join(roomId);
    redisClient.sAdd(roomId, userId); // Track users in Redis
  });

  socket.on("sendMessage", async (messageData) => {
    const { roomId, userId, message } = messageData;
    // Save message to MongoDB
    await Message.create({ roomId, userId, message });
    io.to(roomId).emit("receiveMessage", messageData); // Broadcast message
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
