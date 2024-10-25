const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/create', chatController.createChatRoom);
router.post('/join', chatController.joinChatRoom);
router.get('/:roomId/messages', chatController.getChatMessages);

module.exports = router;
