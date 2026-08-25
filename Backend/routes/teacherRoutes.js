import express from "express";

import { createTeacherController } from "../controllers/teacherController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireOrganization } from "../middleware/organizationMiddleware.js";

const router = express.Router();

// Only organization owners and admins can create teachers
router.post(
  "/:organizationId/teachers",
  protect,
  requireOrganization(["owner", "admin"]),
  createTeacherController
);

export default router;