const HistoryModel = require("../Models/HistoryModel")
const jsonInstance = require("../utils/JsonUtils");
const responeInstance = require("../utils/ResponeUtils");
exports.getHistory=(req, res)=>{
    HistoryModel.find({}).limit(10)
    .then(histories=>{
        if(histories){
            responeInstance.success200(
                res,
                jsonInstance.toJsonWithData(`SUCCESS`, histories)
              );
        }
    })
    .catch(error => responeInstance.error400(res, jsonInstance.jsonNoData(err.message)))
}