const Student = require('../Models/StudentModel');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const jsonInstance = require("../utils/JsonUtils");
const responeInstance = require("../utils/ResponeUtils");
const SubjectModel = require('../Models/SubjectModel');
const StudentModel = require('../Models/StudentModel');
const StudentService = require('../service/StudentService');
const uploadStudent  =path.join('public/uploads/students/');
exports.addStudent = (req, res, next) => {
    let avatarStudent = null;
    let uploadPath;
    let image='';
    if (req.files !== null) {
        avatarStudent = req.files.file; // name of file
        image = new Date().getTime()+path.extname(avatarStudent.name);
        uploadPath = uploadStudent + image;
    }
    console.log( req.body);
    Student.findOne({email: req.body.email})
    .exec(async (err, student) => {
        if(student){ 
            responeInstance.error400(res, jsonInstance.jsonNoData('Student already exists'));
            return 
        }
        // Use the mv() method to place the file somewhere on your server
        let {name,password,age,email,status,description} = req.body;
        age = Number(age);
        const __student = new Student({name,password,age,email,status,description,image});
        console.log(__student);
        try {
            if(avatarStudent){
                await  avatarStudent.mv(uploadPath)
            }
            __student.save()
            .then((student) =>{
                responeInstance.success200(res, jsonInstance.toJsonWithData('SUCCESS',student ));
                return 
            })
            .catch((error) =>{
                console.log('error addStudent',error.message);
                responeInstance.error400(res, jsonInstance.jsonNoData(error.message));
            })
          
        } catch (error) {
            throw new Error(error.message);
        }
    })
}
exports.Students = (req, res) =>{
    Student.find({})
    .exec((err, students) =>{
        if(err){
            responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
        }
        else
        responeInstance.success200(
            res,
            jsonInstance.toJsonWithData(`SUCCESS`, students)
          );
    })
}
exports.removeStudent = async (req, res, next) => {
    const result = await Student.findById(req.body._id)
    console.log(result)
    Student.findByIdAndDelete(req.body._id)
    .then((student)=>{
        if(student){
            console.log(student);
            const oldPath = uploadStudent+ student.image; // old file
            if(fs.existsSync(oldPath)){
                fs.unlinkSync(oldPath)
                console.log('Deleted Image');
              }else{
                console.log('Not find Image in Server');
              }
            responeInstance.success200(
                res,
                jsonInstance.toJsonWithData(`SUCCESS`, student)
              );
        } else{
            throw new Error('Student not found')
        }
        
    })
    .catch(err => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
    })
}
exports.updateStudent = (req, res, next) => {
    Student.findOneAndUpdate({_id:req.body._id},req.body,{new:true})
    .then((student)=>{
        if(student){
            responeInstance.success200(
                res,
                jsonInstance.toJsonWithData(`SUCCESS`, student)
              );
        } else{
            throw new Error('Student not found')
        }
    })
    .catch(err => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
    })
}
exports.changeAvatar = (req, res, next) => {
    let avatarStudent;
    let uploadPath;
    let image;
    if (req.files.file) { // check file is exist
        avatarStudent = req.files.file; // name of file
        image = new Date().getTime()+path.extname(avatarStudent.name);
        uploadPath = uploadStudent + image;
    }else{
        responeInstance.error400(res, jsonInstance.jsonNoData('Not find Image'));
        return
    }
    Student.findOne({_id:req.body._id}) // find student
    .then((student)=>{
        if(student){
            const oldPath = uploadStudent+ student.image; // old file
            const _student = {...student._doc,image:image};  // new student with new image
            console.log('new student',_student)
            try {
                if(fs.existsSync(oldPath)){
                fs.unlinkSync(oldPath)
                }else{
                responeInstance.error400(res, jsonInstance.jsonNoData('Not find Image in Server'));
                }
                avatarStudent.mv(uploadPath) // copy file
                .then(()=>{
                Student.findOneAndUpdate({_id: req.body._id},_student,{new: true})
                .then((student)=>{
                    responeInstance.success200(
                        res,
                        jsonInstance.toJsonWithData(`SUCCESS`, student)
                        );
                })
                })
            } catch (error) {
                responeInstance.error400(res, jsonInstance.jsonNoData(error.message));
                return
            }
        } else{
            throw new Error('Student not found')
        }
    })
    .catch(err => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
    })
}
exports.gradeMark = (req, res, next) => {
    const {_idSubject,_idStudent,type,mark} = req.body;
    console.log(_idSubject,_idStudent,type,mark);
    SubjectModel.findById(_idSubject)
    .then(subject => {
        if(!subject){
            throw new Error('Subject not found')
        }
        StudentModel.findById(_idStudent)
        .then(student =>{
            if(student==null){
                throw new Error('Student not found')
            }
            student.mark = StudentService.replaceArrayMark(student.mark,subject,type,mark); 
            StudentModel.findByIdAndUpdate({_id:_idStudent},student,{new: true})
            .then(newStudent =>{
                responeInstance.success200(res, jsonInstance.toJsonWithData('updated',newStudent));
            })      
        })
        .catch(error =>{
            responeInstance.error400(res, jsonInstance.jsonNoData(error.message));
        })
    })
    .catch(error=>{
        responeInstance.error400(res, jsonInstance.jsonNoData(error.message));
    })
}
exports.detailStudent = (req, res) => {
    Student.findById(req.body._id)
    .then(async student => {
        if(!student){
            throw new Error('Student not found')
        }
        const data = await StudentService._mobile_GetDetailStudent(student)
        console.log(Array.isArray(data));
        responeInstance.success200(res, jsonInstance.toJsonWithData('SUCCESS',data));
    })
    .catch(error=>{
        responeInstance.error400(res, jsonInstance.jsonNoData(error.message));
    })
}
exports.markStudent = (req, res) => {
    Student.findById(req.body._id)
    .then(student => {
        const data = StudentService.avgMarkStudent(student)
        responeInstance.success200(res, jsonInstance.toJsonWithData('SUCCESS',data));
    })
    .catch(error=>{
        responeInstance.error400(res, jsonInstance.jsonNoData(error.message));
    })
}


exports.Test = (req, res) => {
  res.status(200).json({message:'ok'})
}