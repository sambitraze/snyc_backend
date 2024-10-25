// models/ChatRoom.js
const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
  roomName: { type: String }, // Only required for group chats
  isGroupChat: { type: Boolean, default: false }, // Distinguishes personal vs group chat
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of users in the chat room
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
