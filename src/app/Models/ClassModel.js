const mongoose = require('mongoose');
const ProfessorModel = require('./ProfessorModel');
const StudentModel = require('./StudentModel');
const SubjectModel = require('./SubjectModel');
const ClassSchema = new mongoose.Schema({
    name: {type: String,required: true},
    subject:{type: [SubjectModel.schema],default:[]},
    member:{type:[mongoose.Schema.Types.ObjectId],default:[]},
    professor:{type: [mongoose.Schema.Types.ObjectId],default:[]},
    status:{
        type: String,
        enum: ['actived','blocked'],
        default:'actived'
    },
    startDate:{type: Number, default: Date.now().valueOf()},
    schedule1:{type:{
        day: {type :String},
        startTime: {type: Number,default: Date.now().valueOf()},
        endTime: {type: Number,default: Date.now().valueOf()}
    }, required: true},
    schedule2:{type:{
        day: {type :String},
        startTime: {type: Number,default: Date.now().valueOf()},
        endTime: {type: Number,default: Date.now().valueOf()}
    }, required: true},
},{ timestamps:true });

module.exports = mongoose.model('Class',ClassSchema);