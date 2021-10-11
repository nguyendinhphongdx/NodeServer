const jwt = require('jsonwebtoken');
const ProfessorModel = require('../Models/ProfessorModel');
const User = require('../Models/UserModel');
const jsonInstance = require("../utils/JsonUtils");
const responeInstance = require("../utils/ResponeUtils");
exports.login = (req, res, next) =>{
    try {
        User.findOne({user_name:req.body.user_name})
        .exec((err, user) =>{
            if(err){responeInstance.error400(res, jsonInstance.jsonNoData(err.message)); return}
            if(!user){responeInstance.error401(res, jsonInstance.jsonNoData('User not found')); 
            return}
            if(user.authenticate(req.body.password)){
                const startTime = new Date();
                const endTime = new Date(startTime);
                endTime.setMinutes(endTime.getMinutes()+5);
                // create token
                const token = jwt.sign({user:user},process.env.JWT_SECRET,{expiresIn:'5h'});
                responeInstance.success200(res, jsonInstance.toJsonWithData('SUCCESS',{
                    token,
                    start: startTime,
                    end: endTime,    
                    user: user
                }))
            }else{
                responeInstance.error401(res, jsonInstance.jsonNoData('Authenticate Failed')); return
            }
        })
    } catch (error) {
        
    }
}
exports.ProfessorLogin = (req, res, next) =>{
   const email = req.body.email || req.body.user_name
    try {
        ProfessorModel.findOne({email:email})
        .exec((err, pro) =>{
            if(err){responeInstance.error400(res, jsonInstance.jsonNoData(err.message)); return}
            if(!pro){responeInstance.error401(res, jsonInstance.jsonNoData('Profes not found')); return}
            if(pro.authenticate(req.body.password)){
                const startTime = new Date();
                const endTime = new Date(startTime);
                endTime.setMinutes(endTime.getMinutes()+5);
                // create token
                pro = pro.toObject();
                delete pro.class;
                delete pro.subject;
                pro.user_name = pro.name;
                const token = jwt.sign({email:pro.email,password:pro.hash_password},process.env.JWT_SECRET,{expiresIn:'5h'});
                responeInstance.success200(res, jsonInstance.toJsonWithData('SUCCESS',{
                    token,
                    start: startTime,
                    end: endTime,    
                    profesor: pro
                }))
            }else{
                responeInstance.error401(res, jsonInstance.jsonNoData('Authenticate Failed')); return
            }
        })
    } catch (error) {
        
    }
}
exports.requireLogin= (req, res, next) => {
    if(!req.headers.authorization){
        responeInstance.error401(res, jsonInstance.jsonNoData('Token is not exists'));return
    }
    const token = req.headers.authorization.split(' ')[1];
    if(token){
        // verifies secret and checks exp
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (err) {
                return res.status(401).json({"error": true, "message": 'Unauthorized access.'});
            }
        req.decoded = decoded;
        next();
        });
    }
    else{
        return res.status(403).send({
            "error": true,
            "message": 'No token provided.'
        });
    }
    
}