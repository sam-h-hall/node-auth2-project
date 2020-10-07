const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const restrictAccess = require("../middleware/restricted-access-middleware");
const {
  find,
  findBy,
  findById,
  add
} = require("../models/users-model");

// import model and middleware

router.get(
  "/",
  restrictAccess,
  async (req, res, next) => {
    try {
      console.log(process.env.JWT_SECRET);
      const users = await find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({
        message: "There was a server error fulfilling your request",
      });
    }
  }
);

router.post("/register", async (req, res, next) => {
  const credentials = req.body;

  try {
    if (credentials) {
      const hash = bcryptjs.hashSync(credentials.password, 8);
      credentials.password = hash;

      const user = await add(credentials);
      const token = generateToken(user);
      res.status(201).json({
        data: user,
        token,
      });
    } else {
      res.status(400).json({
        message: "Please provide username, password, and department",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server error fulfilling request",
    });
  }
});

router.post("/login", (req, res, next) => {
  const {
    username,
    password
  } = req.body;

  if (req.body) {
    findBy({
        username: username
      })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            message: "Hi, have a token",
            token: token
          });
        } else {
          res.status(401).json({
            message: "invalid credentials"
          })
        }
      }).catch(err => {
        res.status(500).json({
          err: err.message,
          message: "There was a server error fulfilling your request"
        })
      })
  } else {
    res.status(400).json({
      message: "please provide username and password and the password should be alphanumeric"
    });
  }
});

//     if (req.body) {
//       // const [user] = await findBy({
//         username: username
//       })
//       .then(([user]) => {
//         if (user && bcryptjs.compareSync(password, user.password)) {
//           const token = generateToken(user);
//           res.status(200).json({
//             message: "Hi, have a token",
//             token: token
//           });
//         } else {
//           res.status(401).json({
//             message: "invalid credentials"
//           })
//         }
//       })
//       .catch (err) {
//         res.status(500).json({
//           error: err.message,
//           message: "There was a server error fulfilling your request"
//         })
//       }
//     } else {}
//   }
// })

const generateToken = (user) => {
  const payload = {
    // subject: user.id,
    username: user.username,
    password: user.password,
    department: user.department,
  };

  const secret = process.env.JWT_SECRET || "secret";

  const options = {
    expiresIn: "1d",
  };

  const token = jwt.sign(payload, secret, options);

  return token;
};

module.exports = router;