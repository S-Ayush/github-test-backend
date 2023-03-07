const express = require("express");
const router = express();
const cookieParser = require("cookie-parser");
const Project = require("../modal/starRepoSchema");
const User = require("../modal/userSchema");

router.use(cookieParser());

const authenticate = require("../middleware");
const StarRepo = require("../modal/starRepoSchema");

router.get("/userData", authenticate, async (req, res) => {
  var user = await User.findOne({ userName: req.rootuser.userName });
  var staredRepos = await StarRepo.findOne({ userId: req.rootuser._id });
  res.status(200).json({ user, staredRepos: staredRepos?.starRepos });
});
router.post("/starRepo", authenticate, async (req, res) => {
  const starRepos = await StarRepo.findOne({ userId: req.rootuser._id });
  if (starRepos) {
    if (!starRepos.starRepos.some((repo) => repo.id === req.body.id)) {
      starRepos?.starRepos?.unshift(req.body);
      await StarRepo.findByIdAndUpdate(starRepos._id, {
        starRepos: starRepos.starRepos,
      });
    }
  } else {
    const starRepo = StarRepo({
      userId: req.rootuser._id,
      starRepos: [req.body],
    });
    await starRepo.save();
  }
  res.status(200).json({ msg: "success" });
});
router.post("/unstarRepo", authenticate, async (req, res) => {
  const starRepos = await StarRepo.findOne({ userId: req.rootuser._id });
  if (starRepos) {
    starRepos.starRepos.splice(
      starRepos.starRepos.findIndex((item) => item.id === req.body.id),
      1
    );
    await StarRepo.findByIdAndUpdate(starRepos._id, {
      starRepos: starRepos.starRepos,
    });
  } else {
    const starRepo = StarRepo({
      userId: req.rootuser._id,
      starRepos: [],
    });
    await starRepo.save();
  }
  res.status(200).json({ msg: "success" });
});
module.exports = router;
