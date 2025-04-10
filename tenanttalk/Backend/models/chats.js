import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    message: {type: String, required: true},
    senderID: {type: String, required: true},
    receiverID: {type: String, required: true},
    sentAt: {type: Date, default: Date.now},
});

const chatSchema = new mongoose.Schema({
    userIDs: [{type: [String], required: true}],
    messages: [messageSchema],
    createdAt: {type: Date, default: Date.now},
});

const Message = mongoose.model('Message', messageSchema);
const Chat = mongoose.model('Chat', chatSchema);

export { Chat, Message };