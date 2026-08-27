import express from "express";

import {
  createOrganizationController,
  getOrganization,
  getAdminOrganization,
} from "../controllers/organizationController.js";

import { protect } from "../middleware/authMiddleware.js";
import { requireOrganization } from "../middleware/organizationMiddleware.js";

const router = express.Router();

// Create a new organization
router.post("/", createOrganizationController);

// Get organization details for any active member
router.get(
  "/:organizationId",
  protect,
  requireOrganization(),
  getOrganization
);

// Only owner and admin can access this route
router.get(
  "/:organizationId/admin",
  protect,
  requireOrganization(["owner", "admin"]),
  getAdminOrganization
);

export default router;