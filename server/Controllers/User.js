const { User } = require("../Models/User");
const mongoose = require("mongoose");

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({
      user,

      success: true,
      message: "User Found Successfully",
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      success: false,
      message: "Unabel to get the User informaation",
    });
  }
};

exports.getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const user = await User.findById(id);
    // console.log(user);

    const userfriends = await Promise.all(
      user.friends.map((id) => User.findById({ _id: id }))
    );
    // console.log(userfriends);

    const formatedFriends = userfriends.map(
      ({ firstName, lastName, picturePath, accupation, location, _id }) => {
        firstName, lastName, picturePath, accupation, location, _id;
      }
    );

    res.status(200).json({
      userfriends,

      success: true,
      message: "User Found Successfully",
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      success: false,
      message: "Unabel to get the User informaation",
    });
  }
};

exports.addOrRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    console.log(id, "frind", friendId);

    const friend = await User.findById(friendId);
    const user = await User.findById(id);

    if (user.friends.includes(friendId)) {
      user.friends.filter((id) => id !== friendId);
      friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById({ _id: id }))
    );
    // console.log(friends);

    const formatedFriends = friends.map(
      ({ firstName, lastName, picturePath, accupation, location, _id }) => {
        firstName, lastName, picturePath, accupation, location, _id;
      }
    );

    res.status(200).json({
      friends,
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      success: false,
      message: "Unable to add or delete the user",
    });
  }
};
