require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const { Server } = require("socket.io");
const { iconButtonClasses } = require("@mui/material");
const { read } = require("fs");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
  maxHttpBufferSize: 1e8, // 100 MB
});

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_DEV_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

require("./controllers/users/auth.js")(app);
require("./controllers/users/user.js")(app);
require("./controllers/servers/server.js")(app);
require("./controllers/servers/channels.js")(app);

io.use(function (socket, next) {
  require("./middlewares/socketAccessToken")(socket, next);
});

io.on("connection", (socket) => {
  console.log("a user connected " + socket.id);

  require("./controllers/chat/messages.js")(socket, io);
});

server.listen(process.env.PORT, () => {
  console.log(`Server listening: http://localhost:${process.env.PORT}`);
});
