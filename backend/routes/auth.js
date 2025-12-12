const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//const { v4: uuidv4 } = import("uuid");
// meg fogom ölni magam

const Users = require("../models/User");

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

router.post("/register", async (req, res, next) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password)
    return req.status(400).json({
      error: "Missing required fields.",
    });
  const acceptedProviders = [
    "gmail.com",
    "proton.me",
    "freemail.hu",
    "citromail.hu",
    "icloud.com",
    "me.com",
    "yahoo.com",
    "outlook.com",
    "googlemail.com",
    "hotmail.com",
    "live.com",
    "mail.com",
    "protonmail.com",
    "inbox.com",
    "pollak.hu",
    "liba.lol",
    "astrowolf.hu",
    "yippee.hu",
    "chlkrisz.hu",
    "epok.hu",
  ];
  if (!acceptedProviders.includes(email.split("@")[1]))
    return res.status(400).json({
      error: "This email provider is not supported.",
    });

  try {
    const exists = await Users.findOne({ $or: [{ email }, { username }] });
    if (exists)
      return res.status(400).json({
        error: "Email or username already in use.",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({
      id: uuidv4(),
      username: username,
      email: email,
      passwordHash: hashedPassword,
      profile: {
        firstName: username
      }
    });

    await user.save();

    res.status(201).json({
      messaage: "User registered successfully.",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
});

module.exports = router;
