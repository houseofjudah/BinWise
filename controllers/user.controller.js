const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signupUser = async (req, res) => {
  const { username, email, phoneNumber, password, confirmPassword } = req.body;

  // Validate input
  if (!username || !email || !phoneNumber || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      phoneNumber,
      password: hashedPassword,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: `${username}'s account created successfully` });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const signinUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "Enter a valid username" });
  }

  const isValidpassword = await bcrypt.compare(password, user.password);

  if (!isValidpassword) {
    return res.status(401).json({ message: "Invalid Password" });
  }
  const payload = {
    id: user._id,
    username: user.username,
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "5h" });

  res.status(200).json({ token, message: "Logged in successfully" });
};
module.exports = {
  signupUser,
  signinUser,
};
