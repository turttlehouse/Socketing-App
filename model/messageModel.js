const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: String, 
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

 // sender: String,
    // receiver: String,
    // time: String