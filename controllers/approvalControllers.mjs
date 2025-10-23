import Approval from "../models/approval.mjs";
import Transaction from "../models/transaction.mjs";

// 🔹 Get all approvals (for admins or managers)
export const getApprovals = async (req, res, next) => {
  try {
    // You can later add role-based filtering (e.g., if user.isAdmin)
    const approvals = await Approval.find()
      .populate("transaction", "title category type price date")
      .populate("requestedBy", "name email")
      .populate("approvedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(approvals);
  } catch (err) {
    next(err);
  }
};

// 🔹 Get pending approvals only
export const getPendingApprovals = async (req, res, next) => {
  try {
    const approvals = await Approval.find({ status: "pending" })
      .populate("transaction", "title category type price date")
      .populate("requestedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(approvals);
  } catch (err) {
    next(err);
  }
};

// 🔹 Approve a transaction
export const approveTransaction = async (req, res, next) => {
  try {
    const approval = await Approval.findById(req.params.id).populate("transaction");

    if (!approval) return res.status(404).json({ message: "Approval not found" });

    // Update approval status
    approval.status = "approved";
    approval.approvedBy = req.user.id;
    await approval.save();

    // Optionally mark transaction as approved
    approval.transaction.status = "approved";
    await approval.transaction.save();

    res.json({ message: "Transaction approved successfully", approval });
  } catch (err) {
    next(err);
  }
};

// 🔹 Reject a transaction
export const rejectTransaction = async (req, res, next) => {
  try {
    const approval = await Approval.findById(req.params.id).populate("transaction");

    if (!approval) return res.status(404).json({ message: "Approval not found" });

    approval.status = "rejected";
    approval.approvedBy = req.user.id;
    approval.notes = req.body.notes || "No reason provided";
    await approval.save();

    // Optionally mark transaction as rejected
    approval.transaction.status = "rejected";
    await approval.transaction.save();

    res.json({ message: "Transaction rejected", approval });
  } catch (err) {
    next(err);
  }
};
