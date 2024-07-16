const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt with:", { username, password });

    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found:", username);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      console.log("Password mismatch for user:", username);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "security",
      {
        expiresIn: "1h",
      }
    );

    console.log("Login successful for user:", username);
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(400).json({ error: error.message });
  }
};
