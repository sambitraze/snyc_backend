const MessageStatus = require('../models/MessageStatus');

// Update message status
exports.updateMessageStatus = async (req, res) => {
  const { messageId, status } = req.body;
  try {
    const messageStatus = await MessageStatus.findOneAndUpdate(
      { messageId, userId: req.user.id },
      { status, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    res.status(200).json(messageStatus);
  } catch (error) {
    res.status(500).json({ message: "Error updating message status", error });
  }
};
