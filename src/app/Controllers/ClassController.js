const jsonInstance = require("../utils/JsonUtils");
const responeInstance = require("../utils/ResponeUtils");
const ClassModel = require('../Models/ClassModel');
const SubjectModel = require('../Models/SubjectModel');
const ProfessorModel = require('../Models/ProfessorModel');
const StudentModel = require('../Models/StudentModel');
const StudentService = require("../service/StudentService");
const ArrayService = require("../service/ArrayService");
const ClassService = require("../service/ClassService");
const SubjectService = require("../service/SubjectService");
const ProfessorService = require("../service/ProfessorService");
exports.addClass = (req, res, next) => {
    ClassModel.findOne({name: req.body.name})
    .exec(async(err,item) => {
        if(item){ 
            responeInstance.error400(res, jsonInstance.jsonNoData('Class already exists'));
            return 
        }
        const {name,_idSubject,_idProfessor,status,startDate,schedule1,schedule2} = req.body;
        const findSubject = await SubjectModel.findById(_idSubject)
        let subject = [];
        if(findSubject){
            subject = findSubject;
        }
        const professor = _idProfessor;
        const __class = new ClassModel({name,subject,professor,status,startDate,schedule1,schedule2});
        __class.save()
        .then((newClass) =>{
            responeInstance.success200(res, jsonInstance.toJsonWithData('SUCCESS',newClass ));
            return 
        })
        .catch((error) =>{
            console.log('error add newClass',error.message);
            responeInstance.error400(res, jsonInstance.jsonNoData(error.message));
        })
    })
}
exports.Classes = (req, res) =>{
    ClassModel.find({})
    .exec((err, classes) =>{
        if(err){
            responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
        }
        else
        responeInstance.success200(
            res,
            jsonInstance.toJsonWithData(`SUCCESS`, classes)
          );
    })
}
exports.removeClass = (req, res, next) => {
    ClassModel.findByIdAndDelete(req.body._id)
    .then((_class)=>{
        if(_class){
            responeInstance.success200(
                res,
                jsonInstance.toJsonWithData(`SUCCESS`, _class)
              );
        } else{
            console.log('id Student',req.body._id);
            responeInstance.error400(res, jsonInstance.jsonNoData('Not find _class'));
        }
    })
    .catch(err => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
    })
}
exports.updateClass = async (req, res, next) => {
    const {_idSubject,_idProfessor} = req.body;
    try {
        const subject = await Promise.resolve(SubjectModel.findById(_idSubject))
        const professor = await Promise.resolve(ProfessorModel.findById(_idProfessor))
        const _class =  await Promise.resolve(ClassModel.findById(req.body._id))
        var newClass={...req.body};
        if(subject){
            newClass={...newClass,subject}
        }
        if(professor){
            newClass={...newClass,professor}
            if(!ProfessorService.classIsExist(professor._id,_class._id)){
                professor.class.push(_class._id);
                await professor.save();
            }
        }
        ClassModel.findOneAndUpdate({_id:req.body._id},newClass,{new:true})
        .then(async (_class)=>{
            if(_class){
                responeInstance.success200(
                    res,
                    jsonInstance.toJsonWithData(`SUCCESS`, _class)
                );
            } else{
                throw new Error('_class not found')
            }
        })
        .catch(err => {
            responeInstance.error400(res, jsonInstance.jsonNoData("err "+err.message));
        })
    } catch (error) {
        responeInstance.error400(res, jsonInstance.jsonNoData(error.message));
    }
}
exports.assignProfessor = (req, res, next) => {
    const {_idProfessor} = req.body;
    ProfessorModel.findById(_idProfessor)
    .then((professor)=>{
        ClassModel.findOneAndUpdate({_id:req.body._id},{professor:[{...professor}]},{new:true})
        .then((_class)=>{
            if(_class){
                responeInstance.success200(
                    res,
                    jsonInstance.toJsonWithData(`SUCCESS`,_class)
                );
            } else{
                throw new Error('_class not found')
            }
        })
        .catch(err => {
            responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
        })
    })
    .catch((err)=>{
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
    })
}
exports.addMember = async (req, res, next) => {
    const {_idStudents} = req.body;
    try {
        const listMember = await StudentModel.find().where('_id').in(_idStudents)
        ClassModel.findById(req.body._id)
        .then(async(_class)=>{
            if(_class){
                for(var i=0;i<_idStudents.length;i++){
                    console.log(_idStudents[i]);
                    await StudentModel.findById(_idStudents[i])
                    .then(async(student)=>{
                        if(student){
                              if(ArrayService.isExistWithId(_class.member,student._id)){
                                        console.log(`Student already in Class ${student.name}`);
                                }else{
                                        console.log(console.log('Student is not already in Class '+student.name));
                                        student.class.push(_class._id); // student added class
                                        _class.member.push(student._id);
                                        await student.save();
                                        await _class.save();
                                }
                        }
                    })
                }
            }else{
                throw new Error('Class is Not Found')
            }
            await ClassModel.findById(_class._id)
            .then(newClass =>{
                responeInstance.success200(res, jsonInstance.toJsonWithData('SUCCESS',newClass))
            })
        })
        .catch(error =>  responeInstance.error400(res, jsonInstance.jsonNoData(error.message)))
    } catch (error) {
        responeInstance.error400(res, jsonInstance.jsonNoData(error.message))
    }
}
exports.removeMember = (req, res, next) => {
    const {_idStudent,_id} = req.body;
    try {
        console.log(_idStudent);
        StudentModel.findById(_idStudent)
        .then(rstudent =>{
            if(!rstudent){
                throw new Error('Student not found')
            }
            ClassModel.findById(_id)
            .then(rclass=>{
                if(!rclass){
                    throw new Error('Class not found')
                }
                const newStudent = StudentService.removeWithId(rstudent,_id);
                const newClass = ClassService.removeWithId(rclass,newStudent._id);
                StudentModel.findByIdAndUpdate(_idStudent,newStudent,{new:true})
                .then((studentupdated) =>{
                    ClassModel.findByIdAndUpdate(_id,newClass,{new:true})
                    .then((classupdated) =>{
                        responeInstance.success200(res, jsonInstance.toJsonWithData('SUCCESS',classupdated));
                    })
                    .catch(error =>{
                        throw new Error(error.message);
                    })
                })
                .catch(error =>{
                    throw new Error(error.message);
                })
            })
            .catch(error =>{
                throw new Error(error.message);
            })
        })
        .catch(error =>{
            throw new Error(error.message);
        }) 
    } catch (error) {
        responeInstance.error400(res, jsonInstance.jsonNoData(error.message));
    }
    

}
exports.compareClass = (req, res)=>{
    StudentModel.find({})
    .then(students=>{
        if(students){
            ClassModel.find({})
            .then(_class=>{
                if(_class){
                    const dataTotal = ClassService.totalByClass(_class);
                    const dataMark = ClassService.MarkByClass(_class,students);
                    const merge = [...dataMark,...dataTotal];
                    responeInstance.success200(res, jsonInstance.toJsonWithArray('SUCCESS',merge));
                }else{
                    throw new Error('ClassModel not found')
                }
            })
            .catch(err => {throw new Error(err.message)})
        }else{
            throw new Error('students not found')
        }
    })
    .catch(err => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
    })
}
exports.getCommonSchedule =async(req , res)=>{
    const classes = await ClassModel.find({});
    const result = ClassService.getScheduleClass(classes)
    responeInstance.success200(res, jsonInstance.toJsonWithArray('SUCCESS',result));

}
