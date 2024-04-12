import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/userControllre.js";

const routerUser = Router();
routerUser.route("/register").post(registerUser);
routerUser.route("/login").post(loginUser);
routerUser.route("/logout").get(logoutUser);

export default routerUser;
