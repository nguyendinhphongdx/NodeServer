const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    user_name : {
        type: String,
        required: true,
        trim: true,
        min:3,
        max:20
    },
    hash_password: {
        type: String,
        required: true
    },
    phone:{type: String},
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase:true
    },
    permission:{
        type: String,        
        enum:['user','admin'],
        default: 'user'
    }
},{ timestamps:true });

userSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password,10);
});

userSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password,this.hash_password);
    }
}
module.exports = mongoose.model('User',userSchema);