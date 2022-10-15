const mongoose = require("mongoose")

const conversationSchema = new mongoose.Schema({
    idUser: String,
    nameConversation: String,
    lastMessage: String,
    seen: {type: Boolean, default: false},
}, {
    timestamps: true
});

const ConversationModel = mongoose.model('Conversation', conversationSchema)
module.exports = ConversationModel;
