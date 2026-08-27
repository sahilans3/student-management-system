import express from "express";

import { createTeacherController,  getTeachersController, getTeacherController,  updateTeacherController,deactivateTeacherController, } from "../controllers/teacherController.js";
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
// Get all teachers from the organization
router.get(
    "/:organizationId/teachers",
    protect,
    requireOrganization(),
    getTeachersController
  );

// Get a single teacher
router.get(
    "/:organizationId/teachers/:teacherId",
    protect,
    requireOrganization(),
    getTeacherController
  );

// Only owners and admins can update teachers
router.patch(
    "/:organizationId/teachers/:teacherId",
    protect,
    requireOrganization(["owner", "admin"]),
    updateTeacherController
  );

// Only owners and admins can deactivate teachers
router.patch(
    "/:organizationId/teachers/:teacherId/deactivate",
    protect,
    requireOrganization(["owner", "admin"]),
    deactivateTeacherController
  );
export default router;