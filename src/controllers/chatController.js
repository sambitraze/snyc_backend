const ChatRoom = require('../models/ChatRoom');
const ChatParticipant = require('../models/ChatParticipant');
const Message = require('../models/Message');

exports.createChatRoom = async (req, res) => {
  const { roomName, isGroupChat, participants } = req.body;

  try {
    const newRoom = await ChatRoom.create({
      roomName,
      isGroupChat,
      participants,
    });
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create chat room' });
  }
};

exports.joinChatRoom = async (req, res) => {
  const { roomId, userId } = req.body;

  try {
    const participant = await ChatParticipant.create({ userId, chatRoomId: roomId });
    res.status(200).json(participant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to join chat room' });
  }
};

exports.getChatMessages = async (req, res) => {
  const { roomId } = req.params;

  try {
    const messages = await Message.find({ chatRoomId: roomId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};
