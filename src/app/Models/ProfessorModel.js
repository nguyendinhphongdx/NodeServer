const mongoose = require('mongoose');
const ClassModel = require('./ClassModel');
const SubjectModel = require('./SubjectModel');

const ProfessorSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true,
       min:3
   },
   age:{
       type: Number,
       required: true,
    },
    email:{type: String,required: true},
    subject:{type: [SubjectModel.schema],default:[]},
    class:{type: [ClassModel.schema],default:[]},
    status:{
        type: String,
        enum: ['actived','blocked'],
        default:'actived'
    },
    description:{type: String,default:''},
    phone:{type: String,default:''},
    image:{type: String,default:''},
},{ timestamps:true });


module.exports = mongoose.model('Professor',ProfessorSchema);