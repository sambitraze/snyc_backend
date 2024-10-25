const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/createPersonal', chatController.createPersonalChat);
router.post('/createGroup', chatController.createGroupChat);
// router.get('/:roomId/messages', chatController.getChatMessages);

module.exports = router;
