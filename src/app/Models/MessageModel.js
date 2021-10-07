const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    userSendId: {
        type: String,
        required: true
    },
    userReceiveId: {
        type: String,
        required: true
    },
    message:{type: String},
    type:{
        type: String,enum:['text','file'],default:'text'
    },
    displayName:{
        type:String, default:"unKnown"
    },
    file:{
        type:String, default:''
    },
    time: {
        type:Number, default: new Date().getTime()
    }
});


module.exports = mongoose.model('Message',messageSchema);