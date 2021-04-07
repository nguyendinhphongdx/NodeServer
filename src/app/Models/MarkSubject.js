const mongoose = require('mongoose');
const SubjectModel = require('./SubjectModel');

const MarkSubject = new mongoose.Schema({
    subject:{type: SubjectModel.schema,default:{}},
    test:{type: {
        mark: {type: Number},
        date: {type: Date},
    }},
    middle:{type: {
        mark: {type: Number},
        date: {type: Date},
    }},
    final:{type: {
        mark: {type: Number},
        date: {type: Date},
    }},
    total:{type: Number},
});

module.exports = mongoose.model('Mark',MarkSubject);