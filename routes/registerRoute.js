const express = require("express");
const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
  const { email, password, name, isAdmin } = req.body;
  const details = req.body;
  try {
    if (!email || !password || !name || !isAdmin) {
      res.send("Fill all the details");
    } else {
      bcrypt.hash(details.password, 3, async (err, hash) => {
        // Store hash in your password DB.
        const newUser = new UserModel({ ...details, password: hash });
        await newUser.save();
        res.status(201).send("Sign Up successful.");
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = { registerRouter };
