const mongoose = require('mongoose');
const Mark = new mongoose.Schema({
    mark:{type: Number},
    date:{type: new Date().valueOf()},
},{ timestamps:true });

module.exports = mongoose.model('Mark',Mark);