const HistoryModel = require("../Models/HistoryModel");
class HistoryService{
    async pushHistory(user,content,result,remoteAddress,path){
        const _history = new HistoryModel({user,content,result,remoteAddress,path});
        await _history.save();
    }
}
module.exports = new HistoryService();