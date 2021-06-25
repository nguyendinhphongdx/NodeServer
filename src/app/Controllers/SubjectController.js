const path = require('path');
const fs = require('fs');
const jsonInstance = require("../utils/JsonUtils");
const responeInstance = require("../utils/ResponeUtils");
const SubjectModel = require('../Models/SubjectModel');
exports.addSubject = (req, res, next) => {
    SubjectModel.findOne({name: req.body.name})
    .exec((err, subject) => {
        if(subject){ 
            responeInstance.error400(res, jsonInstance.jsonNoData('subject already exists'));
            return 
        }
        const {name,price,totalSession,description,status,type} = req.body;
        const __subject = new SubjectModel({name,price,totalSession,description,status,type});
        __subject.save()
        .then((subject) =>{
            responeInstance.success200(res, jsonInstance.toJsonWithData('SUCCESS',subject ));
            return 
        })
        .catch((error) =>{
            console.log('error addsubject',error.message);
            responeInstance.error400(res, jsonInstance.jsonNoData(error.message));
        })
    })
}
exports.Subjects = (req, res) =>{
    SubjectModel.find({})
    .exec((err, subjects) =>{
        if(err){
            responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
        }
        else
        responeInstance.success200(
            res,
            jsonInstance.toJsonWithData(`SUCCESS`, subjects)
          );
    })
}
exports.removeSubject = (req, res, next) => {
    SubjectModel.findByIdAndDelete(req.body._id)
    .then((subject)=>{
        if(subject){
            responeInstance.success200(
                res,
                jsonInstance.toJsonWithData(`SUCCESS`, subject)
              );
        } else{
            responeInstance.error400(res, jsonInstance.jsonNoData('Not find Subject'));
        }
    })
    .catch(err => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
    })
}
exports.updateSubject = (req, res, next) => {
    SubjectModel.findOneAndUpdate({_id:req.body._id},req.body,{new:true})
    .then((subject)=>{
        if(subject){
            responeInstance.success200(
                res,
                jsonInstance.toJsonWithData(`SUCCESS`, subject)
              );
        } else{
            throw new Error('subject not found')
        }
    })
    .catch(err => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
    })
}
