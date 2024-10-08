const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min:8,
  },
  isAvatarImageSet:{
    type:Boolean,
    default:false,
  },
  avatarImage:{
    type:String,
    default:"",
  }
});

// mongoose.modle("collectionName" , SchemasName)
module.exports = mongoose.model("users", UserSchema);
