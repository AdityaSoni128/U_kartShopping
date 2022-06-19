const express = require('express');
const app = express()


var session = require('express-session')
app.use(session({
  secret: 'ecom U-mart jake dekho',
  resave: false,
  saveUninitialized: true,

}))
const db = require("./database");
db.init();
app.set('view engine', 'ejs');

const port = process.env.PORT  || 3000

const upload = require("./utils/multer")
app.use(upload.single("image"));

app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded());


const userSchema = require("./database/models/users.js");

const userModel = userSchema.schema;


app.use("/admin", function (req, res, next) {
  if (req.session.isLogIn) {
    var id = req.session.user._id;
    var role = req.session.user.role;
    userModel.findOne({ _id: id, role: role }).then(function (userDetails) {
      if (userDetails) {
        next();
      } else {
        res.render("login.ejs", { err: true, success: false, message: "User Cannot Access Admin Page" });
      }
    })
  } else if (req.url == "/login") {
    next();
  } else {
    res.render("admin/adminLogin.ejs", { err: true, success: false, message: "User Cannot Access Admin Page" });
  }
})

// homeEndPoint  route set up 
const homeEndPoint = require("./routes/customer/homeEndPoint");
app.use(homeEndPoint);

// login  route set up 
const login = require("./routes/customer/login")
app.use("/login", login);

// login  route set up 
const adminlogin = require("./routes/admin/login")
app.use("/admin", adminlogin);

// signup  route set up 
const signup = require("./routes/customer/signup")
app.use("/signup", signup);

// changepassword  route set up 
const changepassword = require("./routes/customer/changepassword")
app.use("/changepassword", changepassword);

// forgotPassword  route set up 
const forgotPassword = require("./routes/customer/forgotpassword")
app.use("/forgotPassword", forgotPassword);


// page1  route set up 
const page1 = require("./routes/customer/page1")
app.use("/page1", page1);


// addToCart  route set up 
const addToCart = require("./routes/customer/addtocart")
app.use("/addToCart", addToCart);


// remove Cart  route set up 
const removeCart = require("./routes/customer/removecart")
app.use("/removeFromCart", removeCart);

// decrement the items from Cart  route set up 
const decrement = require("./routes/customer/decrement")
app.use("/decrement", decrement);


// increment the items from Cart  route set up 
const increment = require("./routes/customer/increment")
app.use("/increment", increment);


// verify password using mail link  route set up 
const verifyUser = require("./routes/customer/verifyUsingMail")
app.use("/verify", verifyUser);


// reset password using mail link  route set up 
const resetPassword = require("./routes/customer/resetPasswordUsingMail")
app.use("/reset", resetPassword);

// reset password using mail link  route set up 
const loadMore = require("./routes/customer/loadMore")
app.use("/loadMore", loadMore);


// logout  route set up 
const logout = require("./routes/customer/logout");
app.use("/logout", logout);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
