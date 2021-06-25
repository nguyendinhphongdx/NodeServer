const mongoose = require('mongoose');
const HistorySchema = new mongoose.Schema({
    user:{type: String,default:'defaulAdmin'},
    result:{type: Number},
    content:{type: String},
    date:{type: Number, default: Date.now().valueOf()},
    remoteAddress:{type:String, default:''},
    path:{type:String, default:''},
    method:{type:String, default:''}
},{ timestamps:true },{  capped: { size: 1024, max: 5, autoIndexId: true }});

module.exports = mongoose.model('History',HistorySchema);