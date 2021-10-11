const mongoose = require('mongoose');
const ClassModel = require('./ClassModel');
const SubjectModel = require('./SubjectModel');
const bcrypt = require('bcrypt');

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
    hash_password: {
        type: String,
        default: '123'
    },
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
ProfessorSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password,10);
});

ProfessorSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password,this.hash_password);
    }
}

module.exports = mongoose.model('Professor',ProfessorSchema);