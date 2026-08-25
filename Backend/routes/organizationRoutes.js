import express from "express";
import { createOrganizationController } from "../controllers/organizationController.js";
import {
    getOrganization,
  } from "../controllers/organizationController.js";
  
  import { protect } from "../middleware/authMiddleware.js";
  import { requireOrganization } from "../middleware/organizationMiddleware.js";

const router = express.Router();

router.post("/", createOrganizationController);
router.get(
    "/:organizationId",
    protect,
    requireOrganization(),
    getOrganization
  );
export default router;