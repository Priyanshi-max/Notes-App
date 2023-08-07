const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticator } = require("../middlewares/authenticator");
const { NoteModel } = require("../models/NoteModel");

const noteRouter = express.Router();
noteRouter.use(authenticator);

noteRouter.get("/", async (req, res) => {
  try {
    let data = await NoteModel.find({ user: req.body.user }); // Use 'decode.userID' instead of 'token.userID'
    // console.log(decode.userID);

    console.log(data);
    res.send({
      data: data,
      message: "Success",
      status: 1,
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }

});

noteRouter.post("/create", async (req, res) => {
  try {
    let note = new NoteModel(req.body);
    await note.save();
    res.send({
      message: "Note created",
      status: 1,
    });
  } catch (error) {
    res.send({
      message: "Error creating note: " + error.message,
      status: 0,
    });
  }
});

noteRouter.patch("/", async (req, res) => {
  let { id } = req.headers;
  try {
    await NoteModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({
      message: "Note Updated",
      status: 1,
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

noteRouter.delete("/", async (req, res) => {
  let { id } = req.headers;
  try {
    await NoteModel.findByIdAndDelete({ _id: id });
    res.send({
      message: "Note Deleted",
      status: 1,
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});


noteRouter.get("/auth",(req,res)=>{
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

module.exports = {
  noteRouter,
};
