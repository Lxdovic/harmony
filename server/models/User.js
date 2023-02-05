const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },

  tag: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    maxlength: 355,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    maxlength: 1024,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  profilePicture: {
    type: String,
    default: "",
  },

  customBanner: {
    type: String,
    default: "",
  },

  servers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Server",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
