import express from "express";
import {
  getApprovals,
  getPendingApprovals,
  approveTransaction,
  rejectTransaction,
} from "../controllers/approvalControllers.mjs";
import { verifyToken } from "../middleware/authMiddleware.mjs";
import { isAdmin } from "../middleware/isAdmin.mjs";

const router = express.Router();

// All routes protected and admin-only
router.use(verifyToken);
router.use(isAdmin);

// Get all approvals
router.get("/", getApprovals);

// Get pending approvals
router.get("/pending", getPendingApprovals);

// Approve transaction
router.put("/:id/approve", approveTransaction);

// Reject transaction
router.put("/:id/reject", rejectTransaction);

export default router;
