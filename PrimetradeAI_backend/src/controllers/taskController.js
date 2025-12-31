import Task from "../models/Task.js";

// GET tasks
export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

// CREATE task
export const createTask = async (req, res) => {
  const { title, description } = req.body;

  const task = await Task.create({
    title,
    description,
    user: req.user.id
  });

  res.status(201).json(task);
};

// UPDATE task
export const updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );

  res.json(task);
};

// DELETE task
export const deleteTask = async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
  });

  res.json({ message: "Task deleted" });
};
