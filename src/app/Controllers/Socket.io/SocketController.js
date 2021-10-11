const socketIo = require("../../config/socket.io");
const ClassModel = require("../../Models/ClassModel");
const jsonInstance = require("../../utils/JsonUtils");
const responeInstance = require("../../utils/ResponeUtils");
class SocketController{
    
    sendMessage(){
        const SocketInstance = socketIo.socket;
    }
}
module.exports = new SocketController();