const SubjectModel = require("../Models/SubjectModel");

class SubjectService{
    queryWithId(_id){
        var result = 0;
        if(_id){
            return undefined;
        }else{
            result=  SubjectModel.findById(_id)
            .then(subject => {
                console.log('inside',_id,subject);
                return subject
            })
        }
        return result;
    }
}
module.exports = new SubjectService();