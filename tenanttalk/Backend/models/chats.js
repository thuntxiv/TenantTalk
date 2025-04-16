import mongoose from 'mongoose';
import crypto from 'crypto';

const messageSchema = new mongoose.Schema({
    message: {type: String, required: true},
    senderID: {type: String, required: true},
    receiverID: {type: String, required: true},
    sentAt: {type: Date, default: Date.now},
});

const chatSchema = new mongoose.Schema({
    userIDs: {type: [String], required: true},
    idsKey: {type: String, required: true, unique: true},
    messages: [messageSchema],
    lastmessage: {type: String, required: true},
    lastSenderID: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
});


const Message = mongoose.model('Message', messageSchema);
const Chat = mongoose.model('Chat', chatSchema);

export { Chat, Message };