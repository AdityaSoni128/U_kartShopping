const express = require('express')
const bcrypt=require("bcrypt");
const router = express.Router();

const sendMail = require("../../utils/sendMail.js");
const userSchema = require("../../database/models/users.js");
const userModel = userSchema.schema;
const userRoleEnums = userSchema.role;


router.route("/")
  .get(function (req, res) {
    res.render("signup.ejs", { err: false, message: "" });
  })
  .post(function (req, res) {
    console.log(req.body, req.file);
    var username = req.body.userName;
    var email = req.body.email
    var password = req.body.password;
    var cpassword = req.body.cpassword;

    if (username && password && cpassword === password && email) {
      // console.log("valdite compowdjw")
      var file = req.file.filename;
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
          console.log("error in hashing");
        } else {
          userModel.create({
            username: username,
            email: email,
            image: file,
            password: hash,
            verifyMail: false,
            role: userRoleEnums.customer
          }).then(function (user) {
            var html = `<h3>Aditya, welcome to U-Kart_Shopping <br> please click here to verify Your Email <a href="https://u-kart_shopping-3p34g8mlwjl1rej9g5.codequotient.in/verify/user:${user._id}">Verify</a>!</h3><br /> <h2>U-Kart_shopping/<h2> A World Of Beutiful Items!`;
            sendMail("Verify your Account", user.email, html, function (err) {
              if (err) {
                res.render("signup.ejs", { err: true, message: err });
              } else {
                res.render("login.ejs", { err: false, success: true, message: "Verification Mail has been sent please go to your gmail and verify your Account" });
              }
            })
          }).catch(function (err) {
            console.log(err);
            res.render("signup.ejs", { err: true, message: err });
          })
        }
      });
    } else {
      res.render("signup.ejs", { err: true, message: "Enter valid Details" })
    }
  })

module.exports = router;