let appio = require("./../app");
let authMiddleware = require("./../middleware/authMiddleware");

let groups = [
  { name: "Java", id: "1" },
  { name: "Node.js", id: "2" },
  { name: "HTML", id: "3" },
  { name: "CSS", id: "4" },
];

exports.loadApp = function name(socket) {
  socket.on("disconnect", authMiddleware.disconnected);
  //start
  socket.emit("connected_success", true);
  const count = socket.server.engine.clientsCount;

  let io = appio.appio;
  let appPublicData = appio.appPublicData;

  appPublicData.emit("active_clients", io.USER);
};
exports.publicChat = function name(socket) {
  socket.on("disconnect", authMiddleware.disconnected);
  //start
};

exports.loadGroups = function name(socket) {
  console.log(socket.handshake.auth);
  let groupID = socket.handshake.auth.groupID;
  socket.join(`${groupID}`);
  socket.emit("joined_private_group", {
    event: "you joined",
    name: socket.handshake.auth.name,
  });
  socket.to(`${groupID}`).emit("joined_private_group", {
    event: `${socket.handshake.auth.name} Joined this private group`,
    name: socket.handshake.auth.name,
  });

  socket.on("new_private_group_message", function (data, groupID, callback) {
    socket.to(`${groupID}`).emit("new_group_message", data);
    callback({
      status: "success",
      data,
    });
  });
};
exports.inboxChat = function name(socket) {
  // let data = socket.handshake.auth;
  let io = appio.appPublicData;
  socket.on("private_message", function (data, userID, callback) {
    // socket.to(userID).emit("new_private_message", data);
    io.to(userID).emit("new_private_message", data);

    callback({
      status: "success",
      data,
    });
  });
};
