const mongoose = require('mongoose');
const ClassModel = require('./ClassModel');
const bcrypt = require('bcrypt');
const MarkSubject = require('./MarkSubject');
const StudentSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true,
       min:3
   },
   age:{
       type: Number,
       required: true,
    },
    email:{type: String},
    class:{type: [mongoose.Schema.Types.ObjectId],default:[]},
    status:{
        type: String,
        enum: ['actived','blocked'],
        default:'actived'
    },
    phone:{type: String},
    image:{type: String},
    description:{type: String},
    hash_password:{type: String,required:true},
    mark:{type: [MarkSubject.schema],default:[]}
},{ timestamps:true });
StudentSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password,10);
});

StudentSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password,this.hash_password);
    }
}

module.exports = mongoose.model('Student',StudentSchema);