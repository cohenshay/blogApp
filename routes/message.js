const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');


router.post('/saveMessage', messageController.saveMessage );
router.get('/getPrivateMessages', messageController.getPrivateMessages );
router.get('/getRoomMessages', messageController.getRoomMessages );
 

module.exports = router;