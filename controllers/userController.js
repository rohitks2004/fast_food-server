const {v4:uuidv4} = require('uuid');
const User = require('../modals/userModal');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.loginUser = async (req,res)=>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid password"})
        }

        const token = jwt.sign({user_id:user._id},'secret_token',{expiresIn:'24h'});
        res.status(200).json({userType:user.userType, token});
    }catch(e){
        console.log(e)
    }
}


exports.createUser = async (req,res)=>{
    try{
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            userType:req.body.userType
        })
        await user.save()
        res.status(200).json('user created successfully');
    }catch(e){
        console.log(e);
        res.status(400).json(e);
    }
}


//password is not hashing while updating
// exports.updateUser = async (req,res)=>{
//     const _id = req.params.id;
//     try{
//         const user = await User.find({_id});
//         const [name ,email ,password] = user

//         await User.updateOne({_id},{
//             $set:{
//                 name:req.body.name || name,
//                 email:req.body.email|| email,
//                 password:req.body.password||password
//             }
//         })
//         res.status(200).json("user updated successfully");
//     }
//     catch(e){
//         console.log(e)
//     }
// }

exports.deleteUser = async (req,res)=>{
    const _id = req.params.id;
    try{
        const user = await User.deleteOne({_id})
        res.status(200).json('user deleted successfully');
    }
    catch(e){
        console.log(e);
    }
}