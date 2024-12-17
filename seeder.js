const bcrypt = require("bcryptjs");
const User = require("./models/User");
require('dotenv').config(); // Load environment variables


const seedUsers = async () => {
  try {
    // Temporary users
    const users = [
      { username: "admin", password: "admin123", role: "admin" },
      { username: "doctor", password: "doctor123", role: "doctor" },
      { username: "staff", password: "staff123", role: "staff" },
    ];

    // Hash passwords and save users to the database
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({ username: user.username, password: hashedPassword, role: user.role });
    }

    console.log("Users seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Error seeding users:", err);
    process.exit(1);
  }
};

seedUsers();
