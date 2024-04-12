import { Router } from "express";
import {
  createGoal,
  deleteGoal,
  getGoalById,
  getGoals,
  updateGoal,
} from "../controllers/goalControllre.js";
import { protect } from "../middlewares/verifyToken.js";

const routerGoal = Router();
routerGoal.route("/").get(protect, getGoals).post(protect, createGoal);
routerGoal.route("/:id").get(protect,getGoalById).put(protect, updateGoal).delete(protect, deleteGoal);

export default routerGoal;
