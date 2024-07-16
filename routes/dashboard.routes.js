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
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT: Edit an individual user
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { key ,firstName, lastName, email, phoneNumber, socialHandler } = req.body;
    const updatedUser = await userList.findByIdAndUpdate(
      id,
      {
        key,
        firstName,
        lastName,
        email,
        phoneNumber,
        socialHandler,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE: Delete an individual user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userList.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
