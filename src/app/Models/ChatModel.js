const mongoose = require('mongoose');
const MessageModel = require('./MessageModel');
const ChatSchema = new mongoose.Schema({
    users : [{
        type:mongoose.Schema.Types.ObjectId
    },
],
    messages:{type: [MessageModel.schema],default:[]},
},{ timestamps:true });

module.exports = mongoose.model('Chat',ChatSchema);