class ArrayService{
    isExistWithId (array,id){
        const isExist = array.some(item => JSON.stringify(item._id)==JSON.stringify(id) );
        console.log(isExist);
        return isExist
    }
    isExistInArrayWithId(arrayMember,idMember){
        return arrayMember.some(member=>{
            return JSON.stringify(member._id)===JSON.stringify(idMember)
        })
    }
}
module.exports = new ArrayService();