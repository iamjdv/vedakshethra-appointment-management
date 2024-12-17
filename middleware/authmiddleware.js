const jwt = require("jsonwebtoken");
const User = require("../models/User");
require('dotenv').config();

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token." });
  }
};

// Middleware to authorize specific roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied. Unauthorized role." });
    }
    next();
  };
};

// Middleware to check if user is admin
const isAdmin = authorizeRoles("admin");

// Middleware to check if user is doctor
const isDoctor = authorizeRoles("doctor");

// Middleware to check if user is staff
const isStaff = authorizeRoles("staff");

app.get("/admin/dashboard", authenticateToken, isAdmin, (req, res) => {
  res.json({ message: "Welcome to the admin dashboard." });
});

app.get("/doctor/dashboard", authenticateToken, isDoctor, (req, res) => {
  res.json({ message: "Welcome to the doctor dashboard." });
});

app.get("/staff/schedule", authenticateToken, isStaff, (req, res) => {
  res.json({ message: "Welcome to the staff schedule." });
});
