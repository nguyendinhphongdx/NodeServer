const ProfessorModel = require('../Models/ProfessorModel');
const path = require('path');
const fs = require('fs');
const jsonInstance = require("../utils/JsonUtils");
const responeInstance = require("../utils/ResponeUtils");
const uploadProfessor =path.join('public/uploads/frofessor/');
exports.addProfessor = (req, res, next) => {
    let avatar= null;
    let uploadPath;
    let image;
    if (req.files) {
        avatar = req.files.file; // name of file
        image = new Date().getTime()+path.extname(avatar.name);
        uploadPath = uploadProfessor + image;
    }
    ProfessorModel.findOne({email: req.body.email})
    .exec(async (err, professor) => {
        if(professor){ 
            responeInstance.error400(res, jsonInstance.jsonNoData('professor already exists'));
            return 
        }
        // Use the mv() method to place the file somewhere on your server
        const {name,age,email,status,description,phone} = req.body;
        
        const __professor = new ProfessorModel({name,age,email,status,description,phone,image});
        try {
            if(avatar){
                await avatar.mv(uploadPath)
            }
            __professor.save()
            .then((professor) =>{
                responeInstance.success200(res, jsonInstance.toJsonWithData('SUCCESS',professor ));
                return 
            })
            .catch((error) =>{
                console.log('error addprofessor',error.message);
                responeInstance.error400(res, jsonInstance.jsonNoData(error.message));
            })
        } catch (error) {
            throw new Error(error.message);
        }
    })
}
exports.Professores = (req, res) =>{
    ProfessorModel.find({})
    .exec((err, professores) =>{
        if(err){
            responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
        }
        else
        responeInstance.success200(
            res,
            jsonInstance.toJsonWithData(`SUCCESS`, professores)
          );
    })
}
exports.removeProfessor = (req, res, next) => {
    ProfessorModel.findByIdAndDelete(req.body._id)
    .then((professor)=>{
        if(professor){
            const oldPath = uploadProfessor+ professor.image; // old file
            if(fs.existsSync(oldPath)){
                fs.unlinkSync(oldPath)
              }else{
                responeInstance.error400(res, jsonInstance.jsonNoData('Not find Image in Server'));
              }
            responeInstance.success200(
                res,
                jsonInstance.toJsonWithData(`SUCCESS`, professor)
              );
        } else{
            throw new Error('professor not found')
        }
    })
    .catch(err => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
    })
}
exports.updateProfessor = (req, res, next) => {
    ProfessorModel.findOneAndUpdate({_id:req.body._id},req.body,{new:true})
    .then((professor)=>{
        if(professor){
            responeInstance.success200(
                res,
                jsonInstance.toJsonWithData(`SUCCESS`, professor)
              );
        } else{
            throw new Error('professor not found')
        }
    })
    .catch(err => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
    })
}
exports.changeAvatar = (req, res, next) => {
    let avatar;
    let uploadPath;
    let image;
    if (req.files.file) { // check file is exist
        avatar = req.files.file; // name of file
        image = new Date().getTime()+path.extname(avatar.name);
        uploadPath = uploadProfessor + image;
    }else{
        responeInstance.error400(res, jsonInstance.jsonNoData('Not find Image'));
        return
    }
    ProfessorModel.findOne({_id:req.body._id}) // find Professor
    .then((professor)=>{
        if(professor){
            const oldPath = uploadProfessor+ professor.image; // old file
            const _professor = {...professor._doc,image:image};  // new _professor with new image
            console.log('new _professor',_professor)
            try {
                if(fs.existsSync(oldPath)){
                    fs.unlinkSync(oldPath)
                    }else{
                    responeInstance.error400(res, jsonInstance.jsonNoData('Not find Image in Server'));
                    }
                    avatar.mv(uploadPath) // copy file
                    .then(()=>{
                        ProfessorModel.findOneAndUpdate({_id: req.body._id},_professor,{new: true})
                    .then((professor)=>{
                        responeInstance.success200(
                            res,
                            jsonInstance.toJsonWithData(`SUCCESS`, professor)
                            );
                    })
                })
            } catch (error) {
                responeInstance.error400(res, jsonInstance.jsonNoData(error.message));
                return
            }
        } else{
            throw new Error('professor not found')
        }
    })
    .catch(err => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
    })
}