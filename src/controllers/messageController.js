const Message = require('../models/Message');

// Fetch messages in a chat room
exports.fetchMessages = async (req, res) => {
  const { roomId } = req.params;
  try {
    const messages = await Message.find({ chatRoomId: roomId }).populate('senderId', 'username');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};

// Create a message
exports.createMessage = async (req, res) => {
  const { roomId } = req.body;
  const { messageType, content, attachments } = req.body;
  try {
    const message = await Message.create({ chatRoomId: roomId, senderId: req.user.id, messageType, content, attachments });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Error creating message", error });
  }
};

// Update a message (only content for this example)
exports.updateMessage = async (req, res) => {
  const { messageId } = req.params;
  const { content } = req.body;
  try {
    const message = await Message.findByIdAndUpdate(messageId, { content }, { new: true });
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: "Error updating message", error });
  }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
  const { messageId } = req.params;
  try {
    await Message.findByIdAndDelete(messageId);
    res.status(200).json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting message", error });
  }
};
