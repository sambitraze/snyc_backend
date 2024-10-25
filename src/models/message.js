// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chatRoomId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  messageType: { 
    type: String, 
    enum: ['text', 'image', 'video', 'file'], 
    default: 'text' 
  }, // Type of message (text, image, etc.)
  content: { type: String }, // Text content of the message
  attachments: [{ 
    url: { type: String },
    fileType: { type: String }
  }], // Array of attachments/media (e.g., images, videos)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
