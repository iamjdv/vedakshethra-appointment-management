const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config(); // Load environment variables


const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Login error", error });
  }
};

module.exports = { login };
// User login
exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find user in the database
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      // Generate JWT
      const token = jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
  
      res.json({ token, message: `Login successful as ${user.role}` });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };