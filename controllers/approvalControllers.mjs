import Approval from "../models/approval.mjs";
import Transaction from "../models/transaction.mjs";

// 🔹 Request approval for a transaction
export const requestApproval = async (req, res, next) => {
  try {
    const { transactionId, notes } = req.body;

    const transaction = await Transaction.findOne({
      _id: transactionId,
      userId: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const approval = await Approval.create({
      transaction: transactionId,
      requestedBy: req.user.id,
      notes,
    });

    res.status(201).json(approval);
  } catch (err) {
    next(err);
  }
};

// 🔹 Get all approvals (admin or user)
export const getApprovals = async (req, res, next) => {
  try {
    const approvals = await Approval.find()
      .populate("transaction")
      .populate("requestedBy", "username email")
      .populate("approvedBy", "username email")
      .sort({ createdAt: -1 });

    res.json(approvals);
  } catch (err) {
    next(err);
  }
};

// 🔹 Approve or reject an approval request
export const updateApprovalStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;

    const approval = await Approval.findById(req.params.id);

    if (!approval) {
      return res.status(404).json({ message: "Approval not found" });
    }

    approval.status = status;
    approval.notes = notes || approval.notes;
    approval.approvedBy = req.user.id;

    await approval.save();

    res.json(approval);
  } catch (err) {
    next(err);
  }
};
