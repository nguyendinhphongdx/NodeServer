const User = require('../Models/UserModel');
const jsonInstance = require("../utils/JsonUtils");
const responeInstance = require("../utils/ResponeUtils");
exports.addUser = (req, res, next) => {
    User.findOne({user_name: req.body.user_name})
    .exec((err, user) => {
        if(user){ // check user_name exists or not ?
            return res.status(400).json({
                message: 'User name already exists',
                body: req.body
            })
        };    
    })
    // if user_name is not exists
    // get data from request
    const {user_name, password, phone, email, permission} = req.body;
    //cretate new user
    const _user = new User({user_name,password,phone,email,permission});
    _user.save()
    .then(user =>{
        responeInstance.success200(res,jsonInstance.toJsonWithData(`add user successfully`,user));
        return 
    })
    .catch(err => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
    })
}
exports.Users = (req, res) =>{
    User.find({})
    .exec((err, users) =>{
        if(err){
            responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
        }
        else
        responeInstance.success200(
            res,
            jsonInstance.toJsonWithData(`SUCCESS`, users)
          );
    })
}
exports.removeUser = (req, res, next) => {
    User.findOne({_id: req.body._id})
    .exec((err, user) => {
        if(!user){ // check use exists or not ?
            responeInstance.error400(res, jsonInstance.jsonNoData('User is not exist')); return
        };    
    })
    User.deleteOne({_id: req.body._id})
    .then(user =>{
            responeInstance.success200(
                res,
                jsonInstance.toJsonWithData(`SUCCESS`, user)
              );
    })
    .catch(err => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
    })
}