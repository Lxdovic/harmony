const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },

  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 2000,
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
    required: true,
  },

  attachments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attachment",
    },
  ],
});

module.exports = mongoose.model("Channel", channelSchema);
