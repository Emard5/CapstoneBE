import Approval from "../models/approvals.mjs";
import Transaction from "../models/transaction.mjs";

// 🟢 Get all approvals (for the logged-in user)
export const getApprovals = async (req, res, next) => {
  try {
    const approvals = await Approval.find({ requestedBy: req.user.id })
      .populate("transaction")
      .populate("approvedBy", "name email");
    res.json(approvals);
  } catch (err) {
    next(err);
  }
};

// 🟢 Get pending approvals (for managers/admins, or whoever approves)
export const getPendingApprovals = async (req, res, next) => {
  try {
    const approvals = await Approval.find({ status: "pending" })
      .populate("transaction")
      .populate("requestedBy", "name email");
    res.json(approvals);
  } catch (err) {
    next(err);
  }
};

// 🟢 Approve a transaction
export const approveTransaction = async (req, res, next) => {
  try {
    const approval = await Approval.findById(req.params.id);
    if (!approval) return res.status(404).json({ message: "Approval not found" });

    approval.status = "approved";
    approval.approvedBy = req.user.id;
    await approval.save();

    // Optionally mark the transaction as "approved" too
    await Transaction.findByIdAndUpdate(approval.transaction, { status: "approved" });

    res.json({ message: "Transaction approved successfully", approval });
  } catch (err) {
    next(err);
  }
};

// 🟢 Reject a transaction
export const rejectTransaction = async (req, res, next) => {
  try {
    const approval = await Approval.findById(req.params.id);
    if (!approval) return res.status(404).json({ message: "Approval not found" });

    approval.status = "rejected";
    approval.approvedBy = req.user.id;
    approval.notes = req.body.notes || "";
    await approval.save();

    res.json({ message: "Transaction rejected", approval });
  } catch (err) {
    next(err);
  }
};
