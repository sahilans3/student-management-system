import express from "express";

import {
  loginController,
  getCurrentUser,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Login user
router.post("/login", loginController);

// Get currently authenticated user
router.get("/me", protect, getCurrentUser);

export default router;