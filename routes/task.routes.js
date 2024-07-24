const express = require("express");
const Task = require("../models/taskModel.js");

const router = express.Router();

router.post("/", async (req, res) => {
  const task = new Task({ ...req.body, userId: req.userId });
  await task.save();
  res.send(task);
});

router.get("/", async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.send(tasks);
});

router.get("/:id", async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
  res.send(task);
});

router.put("/:id", async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  res.send(task);
});

router.delete("/:id", async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.send({ message: "Task deleted" });
});

module.exports = router;
