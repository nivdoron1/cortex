import express from "express";
import type {Request, Response, NextFunction} from "express";
import versionsRoutes from "./versions";
import {admin} from "../db";

const router = express.Router();

/** Extending Request type to include user */
interface AuthenticatedRequest extends Request {
  user?: {
    email?: string;
    [key: string]: unknown;
  };
}

/**
 * Middleware to verify Firebase Auth Token
 *
 * @param {AuthenticatedRequest} req - Incoming request
 * @param {Response} res - Outgoing response
 * @param {NextFunction} next - Callback to next middleware
 */
async function verifyAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).send("Unauthorized");
    return;
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (err) {
    res.status(403).send("Invalid token");
  }
}

/**
 * Middleware to allow only editor-level users for protected methods
 *
 * @param {AuthenticatedRequest} req - Incoming request
 * @param {Response} res - Outgoing response
 * @param {NextFunction} next - Callback to next middleware
 */
function requireEditor(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const methodsToProtect = ["POST", "PUT", "PATCH"];
  const editors = ["nivdoron1234@gmail.com"];

  if (!methodsToProtect.includes(req.method)) {
    next();
    return;
  }

  if (req.user?.email && editors.includes(req.user.email)) {
    next();
    return;
  }

  res.status(403).send("Permission denied");
}

router.use("/", verifyAuth, requireEditor, versionsRoutes);

export default router;
