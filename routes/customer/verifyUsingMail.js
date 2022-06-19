const express = require('express')
const router = express.Router();


const userSchema = require("../../database/models/users.js");
const userModel=userSchema.schema;

router.get("/user:usermail", function (req, res) {
  var id = req.params.usermail.split(":")[1];
  console.log(id);
  userModel.findOneAndUpdate({ _id: id }, { verifyMail: true }).then(function (data) {
    if (data) {  // by defalut gives old data of the user
      res.render("login.ejs", { err: false, success: true, message: " Gmail Verification SuccessFull" });
    } else {
      res.render("login.ejs", { err: true, success: false, message: " hacking mat karo bhai user ni mila" });
    }
  }).catch(function (error) {
    console.log(error);
    res.end("techniqal error");
  })
})


module.exports=router;

