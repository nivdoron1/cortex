import express from "express";
import { onRequest } from "firebase-functions/v2/https";
import type { Request, Response, NextFunction } from "express";
import apiRoutes from "./routes";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

const app = express();

// Load Swagger YAML
const swaggerDocument = YAML.load(path.resolve(__dirname, "../swagger.yaml"));

// CORS middleware
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

// Serve Swagger UI at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use("/", apiRoutes);

// 404 handler
app.use((req: Request, res: Response): void => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
  });
});

// Export as Firebase HTTPS function
export const api = onRequest({ cors: true }, app);
