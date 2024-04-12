import express from "express";
import dotenv from "dotenv";
import connectionDB from "./config/dbConn.js";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import routerUser from "./routers/routerUser.js";
import routerGoal from "./routers/routerGoal.js";
import { handlerError, notFound } from "./middlewares/handlerError.js";
import { corsOptions } from "./config/corsOptions.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration CORS
app.use(cors(corsOptions));

// Connection à la base de données
connectionDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Router
app.use("/api/user", routerUser);
app.use("/api/goal", routerGoal);

// Page Not Found
app.use(notFound);

// Gestionnaire d'erreurs
app.use(handlerError);

// Démarrage du serveur
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
