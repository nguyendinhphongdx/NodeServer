const ClassModel = require("../Models/ClassModel");
const StudentModel = require("../Models/StudentModel");
const ClassService = require("./ClassService");
const MarkService = require("./MarkService");

class StudentService{
     replaceArrayMark(origin,subject,type,mark){
         const isExist = origin.some((item) =>{
             return JSON.stringify(subject._id)==JSON.stringify(item.subject._id)
         })
         console.log(isExist);
        var newmap = [...origin];
        if(!isExist){ // không tìm thấy tồn tại subject
                console.log('subject needed new ',subject._id);
                console.log('type needed new ',type);
                switch(type){
                    case 'test': newmap.push({subject,test:{mark,date:new Date().getTime()}}); break;
                    case 'middle': newmap.push({subject,middle:{mark,date:new Date().getTime()}}); break;
                    case 'final': newmap.push({subject,final:{mark,date:new Date().getTime()}}); break;
                    default: break;
                }        
        }else{
            newmap = origin.map(item =>{
                if(JSON.stringify(subject._id)==JSON.stringify(item.subject._id)){
                    console.log('subject needed update ',subject._id);
                    console.log('type needed update ',type);
                    switch(type){
                        case 'test': item.test = {mark,date:new Date().getTime()}; break;
                        case 'middle': item.middle = {mark,date:new Date().getTime()}; break;
                        case 'final': item.final = {mark,date:new Date().getTime()}; break;
                        default: break;
                    }
                }
                return item;
            });
        }
        return newmap;
    }
      AsyncAddStudentToClass(_idStudent,Class){
          console.log( Array.isArray(Class));
          const newclass=[];
          newclass.push(Class);
        return   StudentModel.findByIdAndUpdate(_idStudent,{class:newclass},{ new: true})
          .then(student =>{
              if(student){
                return  student
              }
          })
     }
     removeWithId(array,id){
        const _class = array.class.filter(item=>JSON.stringify(item)!==JSON.stringify(id))
        return{
             ...array._doc,
            class:_class
        }
     }
    avgMarkStudent(student){
        var markClass =0;
        if(student.mark.length==0){
            return  {
                name:student.name,
                mark:0,
            };
        }else{
            const subjects = student.mark;
            subjects.forEach(subject=>{
                markClass+=Number(MarkService.avgMark(subject));
            })
            markClass=Number(markClass/subjects.length).toFixed(2);
        }
        return {
            name:student.name,
            mark:markClass,
        }
    }
    async _mobile_GetAllClassByStudent(student){
        const allClasses = student.class || [];
        const detailAllClass = await ClassModel.find().where('_id').in(allClasses)
        const newClasses = await Promise.all(detailAllClass.map( async _class =>{
            const member = await ClassService._mobile_GetAllStudentByClass(_class);
            const professor = await ClassService._mobile_GetProfessorByClass(_class);
            const obj = {
                ..._class._doc,
                member:member,
                professor:professor
            }
            return obj
        }))
        return newClasses;
    }
    async _mobile_GetAllSubjectByStudent(student){
        const allClasses = student.class || [];
        const marks = student.mark || [];
        const detailAllClass = await ClassModel.find().where('_id').in(allClasses)
       const subjectInClass = detailAllClass.map(item =>{
           const idSubject = item.subject[0]._id || null;
           const searchIn = marks.find(mark =>{
               return JSON.stringify(mark.subject._id) === JSON.stringify(idSubject)   
           })
           const newMark = searchIn?MarkService.avgMark(searchIn):0
        return {
            className:item.name,
            name:item.subject[0].name,
            _id:item._id,
            mark: newMark,
            price:item.subject[0].price
        }  
       })
       return subjectInClass
    }
    async _mobile_GetDetailStudent(student){
        const allClasses = student.class || [];
        const detailAllClass = await ClassModel.find().where('_id').in(allClasses)
        const newClasses = await Promise.all(detailAllClass.map( async _class =>{
            const member = await ClassService._mobile_GetAllStudentByClass(_class);
            const professor = await ClassService._mobile_GetProfessorByClass(_class);
            const obj = {
                _id:_class._id,
                name:_class._doc.name,
                _idSubject:{
                    _id:_class._doc.subject[0]._id,
                    name:_class._doc.subject[0].name
                },
                member:member,
                professor:professor,
            }
            return obj
        }))
        const allMark = student.mark || [];

        return {...student._doc,class:newClasses};
    }
}

module.exports = new StudentService();
