import Transaction from "../models/transaction.mjs";
import Approval from "../models/approvals.mjs"; // ✅ makes approval entries

// 🔹 Create a new transaction + auto approval request
export const createTransaction = async (req, res, next) => {
  try {
    const { title, category, type, price, date } = req.body;

    if (!title || !category || !type || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 1) Create the transaction
    const transaction = await Transaction.create({
      userId: req.user.id,
      title,
      category,
      type,
      price,
      date: date ? new Date(date) : new Date(),
    });

    // 2) Create pending approval
    await Approval.create({
      transaction: transaction._id,   // ✅ schema field
      requestedBy: req.user.id,      // ✅ schema field
      status: "pending",
    });

    res.status(201).json(transaction);
  } catch (err) {
    next(err);
  }
};


// 🔹 Get all transactions for the logged-in user
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    next(err);
  }
};

// 🔹 Get one transaction by ID
export const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!transaction) return res.status(404).json({ message: "Transaction not found" });
    res.json(transaction);
  } catch (err) {
    next(err);
  }
};

// 🔹 Update a transaction
export const updateTransaction = async (req, res, next) => {
  try {
    const updates = req.body;
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      updates,
      { new: true }
    );

    if (!transaction) return res.status(404).json({ message: "Transaction not found" });
    res.json(transaction);
  } catch (err) {
    next(err);
  }
};

// 🔹 Delete a transaction
export const deleteTransaction = async (req, res, next) => {
  try {
    const deleted = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) return res.status(404).json({ message: "Transaction not found" });
    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    next(err);
  }
};
