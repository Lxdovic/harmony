const User = require("../../models/User");
const Server = require("../../models/Server");
const Channel = require("../../models/Channel");
const { v4 } = require("uuid");
const fs = require("fs");
const accessToken = require("../../middlewares/accessToken");

module.exports = (app, io) => {
  app.post("/api/servers", accessToken, async (req, res) => {
    const { name } = req.body;

    try {
      const channel = await Channel.create({
        name: "general",
        type: "text",
      });

      const server = await Server.create({
        name,
        owner: req.user.id,
        members: [req.user.id],
        channels: [channel._id],
      });

      const populatedServer = await Server.findById(server._id).populate(
        "channels"
      );

      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          servers: server._id,
        },
      });

      res.json({ server: populatedServer });
    } catch (err) {
      console.log(err);
    }
  });

  app.get("/api/servers", accessToken, async (req, res) => {
    try {
      const servers = await Server.find({
        members: { $in: req.user.id },
      });

      res.json({ servers });
    } catch (err) {
      console.log(err);
    }
  });

  app.get("/api/servers/:id", accessToken, async (req, res) => {
    const { id } = req.params;

    try {
      const server = await Server.findById(id).populate("channels");

      res.json({ server });
    } catch (err) {
      console.log(err);
    }
  });
};
