const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticator } = require("../middlewares/authenticator");
const { UserModel } = require("../models/UserModel");

const userRouter = express.Router();

userRouter.get("/auth",authenticator,(req,res)=>{
  try{
    res.send({
      message: "user loggedIn",
      status: 1,
    });
  }catch(err){
    res.send({
      message: error.message,
      status: 0,
    })
  }
})
userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 5, async function (err, hash) {
    if (err) return res.send({ message: "Something went wrong", status: 0 });
    try {
      let user = new UserModel({ name, email, password: hash });
      await user.save();
      res.send({
        message: "User Created",
        status: 1,
      });
    } catch (error) {
      res.send({
        message: error.message,
        status: 0,
      });
    }
    // Store hash in your password DB.
  });
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let option = {
    expiresIn:"30d"
  }
  try {
    let data = await UserModel.find({ email });
    let token = jwt.sign({ userId: data[0]._id }, "Priyanshi",option);
    if (data.length > 0) {
      bcrypt.compare(password, data[0].password, function (err, result) {
        // result == true
        if (err)
          return res.send({ message: "Something went wrong" + err, status: 0 });
        if (result) {


          // .cookie("token",token,{
          //   sameSite:"none",
          //   secure:true,
          //   // maxAge:60*24*60*1000
          // })

      
          res.cookie("jwtToken", token, {
            // httpOnly: true,
            
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
            sameSite:"none",
            secure:true
          }).send({
            message: "User Logged in Successfully",
            token: token,
            status: 1,
          });
        } else {
          res.send({
            message: "Incorrect Password",
            status: 0,
          });
        }
      });
    } else {
      res.send({
        message: "User does not exist",
        status: 0,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

userRouter.post("/logout", async (req, res) => {
  
  
    try {
      res.clearCookie("jwtToken").send({
        message: "User Logout",
        status: 1,
      });
    } catch (error) {
      res.send({
        message: error.message,
        status: 0,
      });
    }
    // Store hash in your password DB.
  });
;

module.exports = { userRouter };
