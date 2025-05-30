const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User");

/**
 * @desc   Register new user
 * @route  POST /api/auth/register
 * @method POST
 * @access Public
 */

const register = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // hash for password
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  const result = await user.save();
  const token = result.generateToken();

  const { password, ...others } = result._doc;

  res.status(201).json({ ...others, token });
});

/**
 * @desc   Login user
 * @route  POST /api/auth/login
 * @method POST
 * @access Public
 */

const login =   asyncHandler(async (req, res) => {
    const { error } = validateLoginUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const userExists = await User.findOne({ email: req.body.email });
    if (!userExists) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      userExists.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid Password or Password" });
    }

    const token = userExists.generateToken();
    // const token = jwt.sign({ id: userExists._id, username: userExists.username }, "secretKey", { expiresIn: "1d" });

    const { password, ...others } = userExists._doc;

    res.status(200).json({ ...others, token });
  })


module.exports = {
    register,
    login
}