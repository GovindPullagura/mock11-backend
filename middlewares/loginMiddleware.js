const jwt = require("jsonwebtoken");

// middleware for privateRoute
const privateRoute = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    var decoded = jwt.verify(token, "mock11");
    if (decoded) {
      next();
    } else {
      res.status(400).send("Login Failed");
    }
  } else {
    res.status(400).send("Login Required.");
  }
};

module.exports = { privateRoute };
