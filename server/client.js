// client.js

const io = require("socket.io-client");

// Load environment variables
require("dotenv").config();

// Test Socket.IO Connection
function testSocketIO() {
  const socket = io("http://localhost:5000"); // Replace with your server URL if different

  // Connect to the Socket.IO server
  socket.on("connect", () => {
    console.log("Connected to Socket.IO server:", socket.id);

    // Join a test room and emit a test message
    socket.emit("joinRoom", { roomId: "testRoom", userId: "testUser" });
    socket.emit("sendMessage", {
      roomId: "testRoom",
      userId: "testUser",
      message: "Hello from client.js!",
    });

    // Listen for messages from the server
    socket.on("receiveMessage", (message) => {
      console.log("Message received from server:", message);
    });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Disconnected from Socket.IO server");
  });
}

// Run Tests
async function runTests() {
  console.log("Starting tests...");
  testSocketIO(); // Test Socket.IO connection
}

runTests();
