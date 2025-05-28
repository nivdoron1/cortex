import trafficRoutes from "../../../traffic/routes";
import express from "express";
const router = express.Router();


router.use("/traffic", trafficRoutes);

export default router;
