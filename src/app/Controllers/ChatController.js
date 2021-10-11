const socketIo = require('../config/socket.io');
const ChatModel = require('../models/ChatModel');
const jsonInstance = require("../utils/JsonUtils");
const responeInstance = require("../utils/ResponeUtils");
class ChatController{
    async writeMessage(req,res,next){
       try {
            var {users,message}= req.body;
            if(users){
                var _chat = await ChatModel.findOne({users:{$all:users}});
                if(!_chat){
                    var messages = [];
                    messages.push(message);
                    _chat = new ChatModel({users,messages});
                }else{
                   _chat.messages.push(message);
                }
                await _chat.save();
                if(res){
                    responeInstance.success200(res, jsonInstance.toJsonWithData('SUCCESS',_chat.messages ));
                }
            }
       } catch (error) {
            if(res){
                // response.responseError(error.message,res,400);
                responeInstance.error400(res,error);
            }
            console.log(error.message);
        }
    }
    async queryMessage(req,res,next){
        const limit = req.body.limit || 20;
        const offset = req.body.offset || 0;
        const sort = req.query.sort || true;
            try {
                const {users} = req.body;
                console.log(users);
                if(users){
                    var _chat = await ChatModel.findOne({users:{$all:users}});
                    if(!_chat){
                        responeInstance.success200(res, jsonInstance.toJsonWithData('SUCCESS',[] ));
                    }else{
                        const result = sort=='true'?_chat.messages.reverse():_chat.messages;
                        responeInstance.success200(res, jsonInstance.toJsonWithData('SUCCESS',result));
                    }
                }
            } catch (error) {
                if(res){
                    responeInstance.error400(res,error);
                }
            }
    }
    async queryUserOnline(req,res,next){
        try {
            var users = socketIo.users;
            console.log(users);
            res.status(200).json({
                "status": 200,
                "message": "SUCCESS",
                "totalResult": 2,
                "data": users
            });
        } catch (error) {
            if(res){
                responeInstance.error400(res,error);
            }
        }
}
}
module.exports = new ChatController();