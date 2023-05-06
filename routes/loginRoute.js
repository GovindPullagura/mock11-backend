const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/userModel");

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.send("Fill all the credentials.");
    } else {
      let user = await UserModel.findOne({ email });
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            var token = jwt.sign({ foo: "mocks" }, "mock11");
            res.status(201).send({ msg: "Login Successful", token });
          } else {
            res.status(400).send("Login failed");
          }
        });
      }
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = { loginRouter };
