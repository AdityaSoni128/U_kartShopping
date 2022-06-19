const mongoose = require("mongoose");


const userRoleEnums={
  customer:1,
  admin:2
}
module.exports.role=userRoleEnums;
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  image:{
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  } ,
  verifyMail:{
    type:Boolean,
    required:true
  },
  role:{
    type:Number,
    required:true
  }
},
{ timestamps: true }
);

const userModel = mongoose.model('user', userSchema);

module.exports.schema= userModel;