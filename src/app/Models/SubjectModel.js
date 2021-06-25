const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true,
       min:3
   },
   price:{
       type: Number,
       required: true,
    },
    totalSession:{type: Number,required: true},
    description:{type: String,default:''},
    status:{
        type: String,
        enum: ['actived','blocked'],
        default:'actived'
    },
    type:{type: String,
    enum:['advanced','base'],
    default:'base'
    },
    unit:{type: String,
        enum:['Dolar','VND'],
        default:'VND'
        }
},{ timestamps:true });


module.exports = mongoose.model('Subject',subjectSchema);