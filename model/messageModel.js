const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message: String,
    sender: String,
    receiver: String,
    time: String
})

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;