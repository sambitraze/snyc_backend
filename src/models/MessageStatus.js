// models/MessageStatus.js
const mongoose = require('mongoose');

const messageStatusSchema = new mongoose.Schema({
  messageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['sent', 'delivered', 'read', 'deleted'], 
    default: 'sent' 
  }, // Message status (sent, delivered, read, deleted)
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MessageStatus', messageStatusSchema);
