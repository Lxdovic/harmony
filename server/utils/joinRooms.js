const User = require("../models/User");

module.exports = async (io, server, channel) => {
  let sockets = await io.fetchSockets();

  for (let member of server.members) {
    sockets.map((socket) => {
      if (socket.user.id === member?._id.toString()) {
        if (!socket.rooms.has(channel._id.toString())) {
          socket.join(channel._id.toString());
        }
      }
    });
  }

  return true;
};
