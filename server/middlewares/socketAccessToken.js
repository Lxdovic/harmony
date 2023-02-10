const jwt = require("jsonwebtoken");

module.exports = function (socket, next) {
  try {
    const token = socket.handshake.query.token;

    if (!token) return;

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return;
      }

      socket.user = user;

      next();
    });
  } catch (err) {
    console.log(err);
  }
};
