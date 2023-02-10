const joinRooms = require("../../utils/joinRooms");
const Server = require("../../models/Server");
const Channel = require("../../models/Channel");
const Message = require("../../models/Message");
const Attachment = require("../../models/Attachment");
const { v4 } = require("uuid");
const fs = require("fs");

module.exports = function (socket, io) {
  socket.on("message", async (message) => {
    console.log(message);

    const { server, channel, content, attachments } = message;

    const destinationServer = await Server.findById(server);
    const destinationChannel = await Channel.findById(channel);

    if (!destinationServer || !destinationChannel) {
      return;
    }

    const attachmentIds = await Promise.all(
      attachments.map(async (attachment) => {
        const fileName = v4();

        fs.writeFileSync(`./uploads/` + fileName, attachment.file);

        const dbAttachment = await Attachment.create({
          path: fileName,
          type: attachment.type,
        });

        return dbAttachment._id;
      })
    );

    const dbMessage = await Message.create({
      author: socket.user.id,
      channel,
      attachments: attachmentIds,
      content,
    });

    await Channel.findByIdAndUpdate(channel, {
      $push: {
        messages: dbMessage._id,
      },
    });

    const populatedMessage = await Message.findById(dbMessage._id).populate(
      "attachments"
    );

    await joinRooms(io, destinationServer, destinationChannel);

    io.to(channel).emit("message", populatedMessage);
  });
};
