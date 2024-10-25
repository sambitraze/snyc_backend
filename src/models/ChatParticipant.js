// models/ChatParticipant.js
const mongoose = require('mongoose');

const chatParticipantSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  chatRoomId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
  joinedAt: { type: Date, default: Date.now },
  lastReadMessageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' } // Tracks last message read by participant
});

module.exports = mongoose.model('ChatParticipant', chatParticipantSchema);
