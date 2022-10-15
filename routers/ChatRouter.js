const express = require('express')
const { 
    getAllConversation, 
    postSaveMessage, 
    getMessageByConversation } = require('../controllers/ChatController.js')

const ChatRouter = express.Router()

ChatRouter.get('/', getAllConversation);

ChatRouter.get('/message', getMessageByConversation);

ChatRouter.post('/save', postSaveMessage);

module.exports = ChatRouter;