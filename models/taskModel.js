const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  desc: String, // Add this line
  date: String, // Add this line
  //   status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Task", taskSchema);    
