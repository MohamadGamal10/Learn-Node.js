const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateUpdateUser } = require("../models/User");


/**
 * @desc   Get All Users
 * @route  GET /api/users
 * @method GET
 * @access Private - (only Admin)
 */

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

/**
 * @desc   Get User by ID
 * @route  GET /api/users/:id
 * @method GET
 * @access Private - (only Admin & user himself)
 */

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

/**
 * @desc   Update user
 * @route  PUT /api/users/:id
 * @method PUT
 * @access Private
 */

const updateUser = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  // hash for password
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const user = await User.findById(req.params.id);
  if (user) {
    const result = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
        },
      },
      { new: true }
    ).select("-password");
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

/**
 * @desc   Delete User by ID
 * @route  DELETE /api/users/:id
 * @method DELETE
 * @access Private - (only Admin & user himself)
 */

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
