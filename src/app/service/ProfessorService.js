const ClassModel = require("../Models/ClassModel");
const ProfessorModel = require("../Models/ProfessorModel");

class ProfessorService{
    async classIsExist(_id,idClass){
        const professor = await Promise.resolve(ProfessorModel.findById(_id));
        return professor.class.some(item=>JSON.stringify(item._id)===JSON.stringify(idClass))
    }
    async getAllClassOfProfessor(_idProfessor){
        const classes = await Promise.resolve(ClassModel.find());
        return classes.filter(_class => JSON.stringify(_class.professor[0]) === JSON.stringify(_idProfessor))
    }
}
module.exports = new ProfessorService();