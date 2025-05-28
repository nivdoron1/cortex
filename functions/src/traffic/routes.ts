import express from "express";
import {
  getTraffic,
  createTraffic,
  bulkCreateTraffic,
  updateTraffic,
  deleteTraffic,
  getOneTraffic,
  bulkUpdateTraffic,
} from "./controller";

const router = express.Router();

router.get("/", getTraffic);

// GET one entry by ID
router.get("/:id", getOneTraffic);

// POST single entry
router.post("/", createTraffic);

// POST multiple entries
router.post("/bulk", bulkCreateTraffic);

// PUT (update) single entry
router.put("/:id", updateTraffic);

// PUT multiple entries (bulk update)
router.put("/bulk/update", bulkUpdateTraffic);

// DELETE entry by ID
router.delete("/:id", deleteTraffic);

export default router;
