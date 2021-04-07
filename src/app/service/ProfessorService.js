const ProfessorModel = require("../Models/ProfessorModel");

class ProfessorService{
    async classIsExist(_id,idClass){
        const professor = await Promise.resolve(ProfessorModel.findById(_id));
        
        return professor.class.some(item=>JSON.stringify(item._id)===JSON.stringify(idClass))
    }
}
module.exports = new ProfessorService();