require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const { Server } = require("socket.io");
const io = new Server(server);

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

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(process.env.PORT, () => {
  console.log(`Server listening: http://localhost:${process.env.PORT}`);
});
