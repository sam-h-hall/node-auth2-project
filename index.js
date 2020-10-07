const server = require("./api/server");
require("dotenv").config();
const port = process.env.port || 5000;

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});