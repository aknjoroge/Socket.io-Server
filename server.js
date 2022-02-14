let server = require("./app");
let dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
//creating a server using express object
let port = process.env.PORT || 4000;

// let server = app.listen(port, function () {
server.listen(port, function () {
  console.log(`server started on port ${port}`);
});
