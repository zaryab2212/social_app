const express = require("express");
const {
  getUser,
  getUserFriends,
  addOrRemoveFriend,
} = require("../Controllers/User");
const router = express.Router();

router.get("/:id", getUser);
router.get("/:id/friends", getUserFriends);
router.put("/:id/:friendId", addOrRemoveFriend);

module.exports = router;
