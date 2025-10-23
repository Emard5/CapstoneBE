import express from "express";
import { verifyToken } from "../middleware/authMiddleware.mjs";
import {
  getPendingApprovals,
  updateApprovalStatus,
  createApprovalRequest,
} from "../controllers/approvalControllers.mjs";

const router = express.Router();

router.use(verifyToken);

router.get("/", getPendingApprovals);
router.post("/", createApprovalRequest);
router.put("/:id", updateApprovalStatus);

export default router;
