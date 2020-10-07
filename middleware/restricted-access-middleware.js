const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret";

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization
    // req.headers.authorization.split(" ")[1] :
    // '';

    if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
        // jwt.verify(payload, secret, options => {
        if (err) {
          res.status(401).json({
            err: err.message,
            hi: "hey",
            message: "You shall not pass"
          });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      res.status(401).json({
        message: "You shall not pass"
      });
    };
  } catch (err) {
    res.status(500).json({
      err: err.message,
      message: "Server error fulfilling your request"
    })
  }
};