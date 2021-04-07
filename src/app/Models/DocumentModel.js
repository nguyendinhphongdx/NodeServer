const mongoose = require('mongoose');
const SubjectModel = require('./SubjectModel');

const DocumentSchema = new mongoose.Schema({
    title: {type: String,required: true},
    subject:{type: [SubjectModel.schema],default:[]},
    auther:{type: [mongoose.Schema.Types.ObjectId],default:[]},
    status:{
        type: String,
        enum: ['actived','blocked'],
        default:'actived'
    },
    size:{type: String},
    type:{type:String},
    date:{type: Number, default: Date.now().valueOf()},
    description:{type:String},
    filename:{type:String},
    path:{type:String},
},{ timestamps:true });

module.exports = mongoose.model('Document',DocumentSchema);