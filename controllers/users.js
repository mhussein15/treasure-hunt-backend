const { User } = require("../db/models");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    console.log("Req body",req.body)
    const user = await User.create(req.body);
    const payload = {
      username: user.username,
      exp: Date.now() + JWT_EXPIRATION_MS
    };
    console.log("payload",payload)
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res) => {
  const { user } = req;
  console.log(req.user)
  const payload = {
    username: user.username,
    exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};
