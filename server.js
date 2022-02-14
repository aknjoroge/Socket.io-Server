let server = require("./app");

//creating a server using express object
let port = 4000;

// let server = app.listen(port, function () {
server.listen(port, function () {
  console.log(`server started on port ${port}`);
});
