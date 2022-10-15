const mongoose = require ("mongoose")

const messageSchema = new mongoose.Schema({
    idConversation: {
        type: Schema.Types.ObjectId,
        ref: 'conversation',
    },
    sender: {
        type: String,
        ref: 'user',
    },
    message: {
        type: String,
    },
    createAt: {
        type: Number,
        default: Date.now
    },
}, {
    timestamps: true
});

const MessageModel = mongoose.model('Message', messageSchema);
module.exports = MessageModel;