import express from "express";

import organizationRoutes from "./organizationRoutes.js";
import authRoutes from "./authRoutes.js";
import teacherRoutes from "./teacherRoutes.js";

const router = express.Router();

router.use("/organizations", organizationRoutes);
router.use("/auth", authRoutes);
router.use("/organizations", teacherRoutes);

// Future routes
// router.use("/users", userRoutes);
// router.use("/students", studentRoutes);

export default router;