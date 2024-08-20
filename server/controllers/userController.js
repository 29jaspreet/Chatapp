const User = require("../models/userModels");
const bcrypt= require("bcrypt");

module.exports.register = async (req, resp , next)=>{
   try{
    const{username , email , password} =req.body;
    const usernameCheck = await User.findOne({username});
    if(usernameCheck)
        return resp.json({msg:"Username already used" , status :false});
    const emailCheck = await User.findOne({email});
    if(emailCheck)
        return resp.json({msg:"email already used" , status :false});

    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        email,
        username ,
        password:hashedPassword,
    });
    delete user.password;
    return resp.json({status :true , user});
   }catch(ex){
    next(ex);
   }
};


module.exports.login = async (req, resp , next)=>{
    try{
     const{username , password} =req.body;
     const user= await User.findOne({username});
     if(!user){
        return resp.json({msg:"Incorrect username or password" , status :false});

     }
    const isPasswordValid = await bcrypt.compare(password , user.password);
        if(!isPasswordValid){
            return resp.json({msg:"Incorrect username or password" , status :false});

        }

    
     delete user.password;
     return resp.json({status :true , user});
    }catch(ex){
     next(ex);
    }
 };


 module.exports.setAvatar = async(req,resp,next)=>{
    try{
const userId =req.params.id;
const avatarImage=req.body.image;
const userData = await User.findByIdAndUpdate(userId,{
    isAvatarImageSet:true,
    avatarImage,
    
});
return resp.json({
    isSet:userData.isAvatarImageSet,
    image:userData.avatarImage})
    }catch(ex){
        next(ex);
    }
 };
 module.exports.getAllUsers = async(req,resp,next)=>{
    try{
const users = await User.find({_id:{ $ne: req.params.id}}).select([
    "email",
    "username",
    "avatarImage",
    "_id"
]);
return resp.json(users);
    }catch(ex){
        next(ex);
    }
 }

