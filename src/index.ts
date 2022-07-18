import "reflect-metadata";
require("dotenv").config();

import express from "express";
import cors from "cors";
import morgan from "morgan";

import tasksRouter from "./routes/TasksRouter";
import authRouter from "./routes/AuthRouter";
import { errorHandler } from "./lib/middlewares/errorHandler";
import { authenticateJWT } from "./lib/middlewares/authenticate";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const PORT = +(process.env.PORT as string) || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/api/auth", authRouter);
app.use("/api/tasks", authenticateJWT, tasksRouter);

app.use(errorHandler);

export { app, server };
