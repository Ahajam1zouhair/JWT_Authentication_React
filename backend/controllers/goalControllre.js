import asyncHandler from "express-async-handler";
import {
  ValidateCreateGoal,
  ValidateUpdateGoal,
} from "../requests/ValidateGoal.js";
import { Goal } from "../models/goal.js";

// @desc    Get all goals
// @route   GET /api/goals
// @access  Private
export const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @desc    Get  goal by id
// @route   GET /api/goals/:id
// @access  Private
export const getGoalById = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    return res.status(404).json({ error: "Goal not found" });
  } else {
    res.status(200).json(goal);
  } 
});

// @desc    Create a goal
// @route   POST /api/goals
// @access  Private
export const createGoal = asyncHandler(async (req, res) => {
  const { error } = ValidateCreateGoal(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const goal = new Goal({
    text: req.body.text,
    user: req.user.id,
  });
  await goal.save();
  res.status(201).json(goal);
});

// @desc    Update a goal
// @route   PUT /api/goals/:id
// @access  Private
export const updateGoal = asyncHandler(async (req, res) => {
  const { error } = ValidateUpdateGoal(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    return res.status(404).json({ error: "Goal not found" });
  } else if (goal.user.toString() !== req.user.id) {
    return res.status(401).json({ error: "User not authorized" });
  } else {
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );
    res.status(200).json(updatedGoal);
  }
});

// @desc    Delete a goal
// @route   DELETE /api/goals/:id
// @access  Private
export const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    return res.status(404).json({ error: "Goal not found" });
  } else if (goal.user.toString() !== req.user.id) {
    return res.status(401).json({ error: "User not authorized" });
  } else {
    await goal.deleteOne();
    res.status(200).json({ id: req.params.id });
  }
});
