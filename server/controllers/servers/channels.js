const User = require("../../models/User");
const Server = require("../../models/Server");
const Channel = require("../../models/Channel");
const { v4 } = require("uuid");
const fs = require("fs");
const accessToken = require("../../middlewares/accessToken");
const path = require("path");
const { populate } = require("mongoose/lib/model");

module.exports = (app, io) => {
  app.get("/api/server/channels/:id", accessToken, async (req, res) => {
    const { id } = req.params;

    try {
      const server = await Server.findById(id, {
        _id: 0,
        name: 0,
        owner: 0,
        members: 0,
        createdAt: 0,
        __v: 0,
      }).populate({
        path: "channels",
        populate: { path: "messages", populate: { path: "attachments" } },
      });

      res.json({ channels: server.channels });
    } catch (err) {
      console.log(err);
    }
  });
};
