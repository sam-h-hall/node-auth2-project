const express = require("express");
const helmet = require("helmet");
const usersRouter = require("../routers/users-router");

const server = express();

// const sessionConfig = {
//   name: "token",
//   secret: "false",
//   cookie: {
//     maxAge: 60 * 60 * 1000,
//     secure: false,
//     httpOnly: true,
//   },
//   resave: false,
//   saveUninitialized: false,
//   store: new knexSessionStore({
//     knex: require("../data/db-config"),
//     table: "sessions",
//     sidfieldname: "sid",
//     clearInterval: 60 * 60 * 1000
//   })
// }

server.use(helmet());
server.use(express.json());

server.use("/api/users", usersRouter);

module.exports = server;