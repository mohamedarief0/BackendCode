const UserList = require("../models/userList.js"); // Import your Mongoose User model

exports.getDashboard = async (req, res) => {
  try {
    const users = await UserList.find(); // Fetch all users from MongoDB
    res.json(users); // Send the users array as JSON response
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
};
