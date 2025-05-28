import express from "express";
import {onRequest} from "firebase-functions/v2/https";
import type {Request, Response, NextFunction} from "express";
import apiRoutes from "./routes";

const app = express();

// Enable CORS middleware
app.use((req: Request, res: Response, next: NextFunction): void => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  next();
});

app.use("/", apiRoutes);

// Handle 404
app.use((req: Request, res: Response): void => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
  });
});

// Export the function with v2 onRequest
export const api = onRequest({cors: true}, app);
