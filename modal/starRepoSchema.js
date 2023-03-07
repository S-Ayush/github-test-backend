const mongoose = require("mongoose");

const starRepoSchema = new mongoose.Schema({
  starRepos: {
    type: Array,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const StarRepo = mongoose.model("STARREPO", starRepoSchema);

module.exports = StarRepo;
