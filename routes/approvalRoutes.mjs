import express from "express";
import {
  getApprovals,
  getPendingApprovals,
  approveTransaction,
  rejectTransaction,
} from "../controllers/approvalControllers.mjs";
import { verifyToken } from "../middleware/authMiddleware.mjs";

const router = express.Router();

// All routes protected
router.use(verifyToken);

// Get all approvals
router.get("/", getApprovals);

// Get pending approvals
router.get("/pending", getPendingApprovals);

// Approve transaction
router.put("/:id/approve", approveTransaction);

// Reject transaction
router.put("/:id/reject", rejectTransaction);

export default router;
