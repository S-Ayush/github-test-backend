const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("USER", userSchema);

module.exports = User;
