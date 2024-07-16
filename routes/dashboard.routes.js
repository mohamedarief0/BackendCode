const express = require("express");
const { getDashboard } = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");
const userList = require("../models/userList.js");
const router = express.Router();

// GET: Get user details
router.get("/", authMiddleware, getDashboard);
// POST: Create a new user
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, socialHandler } = req.body;
    const newUser = new userList({
      firstName,
      lastName,
      email,
      phoneNumber,
      socialHandler,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// DELETE: Deleting the user



module.exports = router;
