import Transaction from "../models/Transaction.js";

export const index = async (req, res) => {
  const transactions = await Transaction.find({ user_id: req.user._id }).sort({
    createdAt: -1,
  });
  res.json({ data: transactions });
};

export const store = async (req, res) => {
  const { amount, description, date, category_id } = req.body;
  const transaction = new Transaction({
    amount,
    description,
    date,
    category_id,
    user_id: req.user._id,
  });
  await transaction.save();
  res.json({ message: "Transaction saved successfully!" });
};

export const update = async (req, res) => {
  await Transaction.updateOne({ _id: req.params.id }, { $set: req.body });
  res.json({ message: "Transaction updated successfully!" });
};

export const destroy = async (req, res) => {
  await Transaction.deleteOne({ _id: req.params.id });
  res.json({ message: "Transaction deleted successfully!" });
};
