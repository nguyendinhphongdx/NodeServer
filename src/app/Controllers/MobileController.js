const Student = require('../Models/StudentModel');
const jsonInstance = require("../utils/JsonUtils");
const responeInstance = require("../utils/ResponeUtils");
const SubjectModel = require('../Models/SubjectModel');
const StudentModel = require('../Models/StudentModel');
const StudentService = require('../service/StudentService');
const ClassModel = require('../Models/ClassModel');
const ClassService = require('../service/ClassService');


exports.Login = (req, res) => {
    Student.findOne({email:req.body.email})
    .exec((err, student) =>{
        if(err){responeInstance.error400(res, jsonInstance.jsonNoData(err.message)); return}
        if(!student){responeInstance.error401(res, jsonInstance.jsonNoData('User not found')); return}
        if(student.authenticate(req.body.password)){
            const {status,_id,name,age,email,image} = student;
            responeInstance.success200(res, jsonInstance.toJsonWithObject('Login Success', {status,_id,name,age,email,image}))
        }else{
            responeInstance.error401(res, jsonInstance.jsonNoData('Authenticate Failed')); return
        }        
    })
}
exports.getAllClass = (req, res) => {
    Student.findById(req.body._id)
    .then( async student => {
        if(!student){
            throw new Error('Student is not Found')
        }
        const data = await StudentService._mobile_GetAllClassByStudent(student)
        console.log(Array.isArray(data));
        responeInstance.success200(res, jsonInstance.toJsonWithArray('SUCCESS',data));
    })
    .catch(error=>{
        responeInstance.error400(res, jsonInstance.jsonNoData(error.message));
    })
}
exports.getAllSubject = (req, res) => {
    Student.findById(req.body._id)
    .then( async student => {
        if(!student){
            throw new Error('Student is not Found')
        }
        const data = await StudentService._mobile_GetAllSubjectByStudent(student)
        console.log(Array.isArray(data));
        responeInstance.success200(res, jsonInstance.toJsonWithArray('SUCCESS',data));
    })
    .catch(error=>{
        responeInstance.error400(res, jsonInstance.jsonNoData(error.message));
    })
}

exports.getScheduleStudent =async(req , res)=>{
    const {_id} = req.body;
    try {
        const student = await StudentModel.findById(_id);
        if(!student){
            throw new Error('Student not found')
        }
        const classes = await ClassModel.find().where('_id').in(student.class)
        if(!classes){
            throw new Error('Class not found')
        }
        const result = ClassService.getScheduleClasses(classes)
        responeInstance.success200(res, jsonInstance.toJsonWithArray('SUCCESS',result));
    } catch (error) {
        responeInstance.error400(res, jsonInstance.jsonNoData(error.message));
    } 
}