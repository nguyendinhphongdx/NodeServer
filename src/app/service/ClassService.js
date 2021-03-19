const { countMarkAvgStudent } = require("../helpers/functionExcept");
const ProfessorModel = require("../Models/ProfessorModel");
const StudentModel = require("../Models/StudentModel");
const ArrayService = require("./ArrayService");
const MarkService = require("./MarkService");
const StudentService = require("./StudentService");
class ClassService{
    totalByClass(arrayClass){
        var dataChart =[];
        dataChart = arrayClass.map(_class =>{
            return {
                name:'Total',
                class:`${_class.name}`,
                value:`${_class.member.length}`}
        })
        return dataChart;
    }
    MarkByClass(arrayClass,arrayStudent){
        var result = [];
       for (let index = 0; index < arrayClass.length; index++) {
            result.push(getMarkClass(arrayClass[index].member,arrayStudent,arrayClass[index].name));
       }
        return result;
    }
    removeWithId(array,id){
       const member = array.member.filter(item=>JSON.stringify(item)!==JSON.stringify(id))
       return{
            ...array._doc,
            member:member
       }
    }
    async _mobile_GetAllStudentByClass(_class){
        const allMember = _class.member || [];
        let detailAllMember = await StudentModel.find().where('_id').in(allMember)
        detailAllMember = await detailAllMember.map(item=>{
            return {
                name: item.name,
                _id: item._id
            }
        })
        return detailAllMember;
    }
    async _mobile_GetProfessorByClass(_class){
        if(!_class.professor[0]){
            return {
                name:"default name",
                _id:"defaul id",
                image:"defaul image"
            }
        }
        let professor = await ProfessorModel.findById(_class.professor[0])
        return {
            name:professor.name,
            _id:professor._id,
            image:professor.image
        };
    }
    getScheduleClass(classes){
        const result = classes.map(item=>{
            // Id: 1,
            // Subject: 'Explosion of Betelgeuse Star',
            // StartTime: new Date(2021, 1, 15, 5, 30),
            // EndTime: new Date(2021, 1, 15, 7, 0)
            return {
                Id:item._id,
                Subject: item.name,
                St
            }
        })
    }
    
}
function getMarkClass(members,students,name){
    const membersInClass = members.map(idMember =>{
        var student = students.find(item=>JSON.stringify(item._id)===JSON.stringify(idMember));
        return student
    })
    var dataMark={
        name:'Mark',
        class:`${name}`,
        value:`${countMarkClas(membersInClass)}`
    }
   return dataMark;
}
function countMarkClas(membersInClass){
    var total =0;
    membersInClass.forEach(member => total += Number(countMarkAvgStudent(member).mark));
    return (Number(total)/membersInClass.length).toFixed(1);
}

module.exports = new ClassService();