import express from "express";
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionControllers.mjs";
import { verifyToken } from "../middleware/authMiddleware.mjs";

const router = express.Router();

// ✅ All routes below are protected (user must be logged in)
router.use(verifyToken);

// Create a new transaction
router.post("/", createTransaction);

// Get all transactions for the logged-in user
router.get("/", getTransactions);

// Get a single transaction by ID
router.get("/:id", getTransactionById);

// Update a transaction
router.put("/:id", updateTransaction);

// Delete a transaction
router.delete("/:id", deleteTransaction);

export default router;
