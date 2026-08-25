import express from "express";

import organizationRoutes from "./organizationRoutes.js";
import authRoutes from "./authRoutes.js";
// import userRoutes from "./userRoutes.js";
// import studentRoutes from "./studentRoutes.js";

const router = express.Router();

router.use("/organizations", organizationRoutes);
router.use("/auth", authRoutes);
// router.use("/users", userRoutes);
// router.use("/students", studentRoutes);

export default router;