//requiring express node js module
let express = require("express");
//initialize express
let app = express();
//require https module
const http = require("http");
//initialize a server
const server = http.createServer(app);
// import socket server
let { Server } = require("socket.io");
//initialize socket io
let io = new Server(server, {
  cors: { origin: ["http://localhost:3000", "http://localhost"] },
});

//require the middlware
let authMiddleware = require("./middleware/authMiddleware");
//require callback
let connection = require("./controller/loadAppData");

//Provide the client a socket ID, acts as our token
io.of("/provider").on("connection", (socket) => {
  let userName = socket.handshake.auth.userName;

  if (userName) {
    socket.user = {
      userName,
      id: socket.id,
    };

    socket.emit("public_user", true);
    socket.emit("USER_ID", socket.id);
  }
});

//Define socket NameSpace
const appPublicData = io.of("/publicData");
const publicChat = io.of("/chat");
const subscribeToChat = io.of("/chat/subscribe");
const groupChat = io.of("/groups");
const inboxChat = io.of("/inbox");

//Example of a middleware
appPublicData.use(authMiddleware.protected);

//Read conencted socket stats
appPublicData.on("connection", connection.loadApp);
subscribeToChat.on("connection", authMiddleware.subscribe);
publicChat.on("connection", authMiddleware.publicProtected);
groupChat.on("connection", connection.loadGroups);
inboxChat.on("connection", connection.inboxChat);

//Public response
function publicResponce(method, res) {
  res.json({
    application: "Socket.io Base Server",
    apiUrl: "/api/v1/",
    url: "https://public-socket.web.app/",
  });
}
app.get("/", function (req, res) {
  publicResponce("GET", res);
});
app.post("/", function (req, res) {
  publicResponce("POST", res);
});

app.use("*", function (req, res, next) {
  res.json({
    status: "failled",
    message: "Route not set",
  });
});

exports.appPublicData = appPublicData;
exports.appio = io;

module.exports = server;
