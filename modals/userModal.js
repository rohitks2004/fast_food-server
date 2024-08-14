const mongoose =require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    id:String,
    name: {
        type:String,
        required:[true,"name is required"]
    },
    userType:{
        type:String,
        enum:['admin','customer','restaurant'],
        required:[true,"user type is required"]
    }
    ,
    email: {
        type:String,
        required:[true,"email is required"]
    },
    password: {
        type:String,
        required:[true,"password is required"]
    }
})

userSchema.pre('save',async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

module.exports = mongoose.model('user',userSchema);