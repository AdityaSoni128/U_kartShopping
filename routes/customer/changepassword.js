
const express = require('express')
const router = express.Router();

const userSchema = require("../../database/models/users.js");
const userModel=userSchema.schema;
const sendMail = require("../../utils/sendMail.js");



router.route("/").get(function (req, res) {
  if (req.session.isLogIn) {
    res.render("changePassword.ejs", { err: false, message: "" });
  } else {
    res.render("login.ejs", { err: true, success: false, message: "Login kare bina password change nhi hoga hacking na kare" });
  }
}).post(function (req, res) {
  if (req.session.isLogIn) {
    var newPass = req.body.newPassword;
    var confirmPass = req.body.confirmNewPassword;
    var oldPass = req.body.oldPassword;
    if (newPass !== confirmPass) {
      res.render("changePassword.ejs", { err: true, message: "New password and Confirm Password are not Matching" });
    } else {
      var userId = req.session.user._id;
      var email = req.session.user.email;
      userModel.findOneAndUpdate({ _id: userId, password: oldPass }, { password: newPass }).then(function (user) {
        if (user) {
          var html = `Your New password is <h1>${newPass}</h1> Do not share these mail to anyone`;
          sendMail("Password Changed Successfully", email, html, function (error) {

            if (error) {
              res.end(error);
            }
            else {
              req.session.destroy();
              res.render("login.ejs", { err: false, success: true, message: "your Password has been changed SuccessFully Please Login below " });
            }
          })
        } else {
          res.render("changePassword.ejs", { err: true, message: " It seems You Have entered wrong Old password" });
        }
      })
    }

  } else {
    res.render("login.ejs", { err: true, success: false, message: "Login kare bina password change nhi hoga hacking na kare" });
  }
})


module.exports=router;