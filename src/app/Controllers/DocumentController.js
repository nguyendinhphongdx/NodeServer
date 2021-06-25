const SubjectModel = require('../Models/SubjectModel');
const DocumemtModel = require('../Models/DocumentModel');
const path = require('path');
const fs = require('fs');
const jsonInstance = require("../utils/JsonUtils");
const responeInstance = require("../utils/ResponeUtils");
const ProfessorModel = require('../Models/ProfessorModel');
const { resolveSoa } = require('dns');
const uploadDocumemt  =path.join('public/uploads/document/');
exports.uploadDocumemt = (req, res) => {
    if (req.files == null) {
        responeInstance.error400(res, jsonInstance.jsonNoData('Not find file'));
        return
    }
    try {
    const fileDocument = req.files.file; // name of file
    const filename = new Date().getTime()+path.extname(fileDocument.name);
    const uploadPath = uploadDocumemt + filename;
    const {title,_idSubject,description,_idAuth,status} = req.body;
    DocumemtModel.findOne({title})
    .exec(async (err, document) => {
        if(document){ 
            responeInstance.error400(res, jsonInstance.jsonNoData('Title already exists'));
            return 
        }
        const subject = await SubjectModel.findById(_idSubject);
        if(!subject){
            throw new Error('Subject not found');
        }
        const professor = await ProfessorModel.findById(_idAuth);
        if(!professor){
            throw new Error('Professor not found');
        }
        const type = path.extname(fileDocument.name).split('.')[1];
        const size = fileDocument.size;
        const pathFile = `uploads/document/${filename}`;
        const __document = new DocumemtModel({title,subject,description,auther:_idAuth,type,size,filename,status,path:pathFile});
        fileDocument.mv(uploadPath)
        .then(() =>{
            __document.save()
            .then((document) =>{
                responeInstance.success200(res, jsonInstance.toJsonWithData('SUCCESS',document));
                return 
            })
            .catch((error) =>{
                throw new Error(error.message);
            })
        })
        .catch(err =>{
            throw new Error(err.message);
        })
    })
        
    } catch (error) {
        throw new Error(error.message);
    }
    
}
exports.Documents = (req, res) =>{
    DocumemtModel.find({})
    .exec((err, documents) =>{
        if(err){
            responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
        }
        else
        responeInstance.success200(
            res,
            jsonInstance.toJsonWithData(`SUCCESS`, documents)
          );
    })
}
exports.removeDocument = (req, res, next) => {
    DocumemtModel.findByIdAndDelete(req.body._id)
    .then((document)=>{
        if(document){
            const oldPath = uploadDocumemt+ document.image; // old file
            if(fs.existsSync(oldPath)){
                fs.unlinkSync(oldPath)
              }else{
                responeInstance.error400(res, jsonInstance.jsonNoData('Not find Image in Server'));
              }
            responeInstance.success200(
                res,
                jsonInstance.toJsonWithData(`SUCCESS`, document)
              );
        } else{
            throw new Error('document not found')
        }
        
    })
    .catch(err => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
    })
}
exports.updateDocument = (req, res, next) => {
    DocumemtModel.findOneAndUpdate({_id:req.body._id},req.body,{new:true})
    .then((document)=>{
        if(document){
            responeInstance.success200(
                res,
                jsonInstance.toJsonWithData(`SUCCESS`, document)
              );
        } else{
            throw new Error('document not found')
        }
    })
    .catch(err => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
    })
}
exports.viewDocument = (req, res, next) => {
    const pathDoc = process.cwd() +'/'+uploadDocumemt+'/'+req.params.filename
    res.sendFile(pathDoc)
    fs.readFile(pathDoc, function (err,data){
        response.contentType("application/pdf");
        response.send(data);
     });
}

