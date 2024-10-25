const ChatRoom = require('../models/ChatRoom');
const ChatParticipant = require('../models/ChatParticipant');

// Fetch all user chats (personal and group)
exports.fetchMyChats = async (req, res) => {
  try {
    const chatRooms = await ChatRoom.find({ participants: req.user.id }).populate('participants', 'username');
    res.status(200).json(chatRooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chats", error });
  }
};

// Create Personal Chat
exports.createPersonalChat = async (req, res) => {
  const { userId } = req.body;
  try {
    let chatRoom = await ChatRoom.findOne({ participants: { $all: [req.user.id, userId], $size: 2 } });
    if (!chatRoom) {
      chatRoom = await ChatRoom.create({ isGroupChat: false, participants: [req.user.id, userId] });
    }
    res.status(201).json(chatRoom);
  } catch (error) {
    res.status(500).json({ message: "Error creating personal chat", error });
  }
};

// Create Group Chat
exports.createGroupChat = async (req, res) => {
  const { roomName, participantIds } = req.body;
  try {
    const chatRoom = await ChatRoom.create({ roomName, isGroupChat: true, participants: [req.user.id, ...participantIds] });
    res.status(201).json(chatRoom);
  } catch (error) {
    res.status(500).json({ message: "Error creating group chat", error });
  }
};

// Update Chat Room (e.g., add/remove participants)
exports.updateChatRoom = async (req, res) => {
  const { roomId } = req.params;
  const { participantIds } = req.body;
  try {
    const chatRoom = await ChatRoom.findByIdAndUpdate(roomId, { participants: participantIds }, { new: true });
    res.status(200).json(chatRoom);
  } catch (error) {
    res.status(500).json({ message: "Error updating chat room", error });
  }
};

// Delete Chat Room
exports.deleteChatRoom = async (req, res) => {
  const { roomId } = req.params;
  try {
    await ChatRoom.findByIdAndDelete(roomId);
    res.status(200).json({ message: "Chat room deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting chat room", error });
  }
};
