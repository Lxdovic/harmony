const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },

  type: {
    type: String,
    required: true,
  },

  path: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Attachment", attachmentSchema);
