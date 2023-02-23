import { Router } from "express";
import Transaction from "../models/Transaction.js";
import passport from "passport"

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const transactions = await Transaction.find({}).sort({ createdAt: -1 });
    res.json({ data: transactions });
  }
);

router.post("/", async (req, res) => {
  const { amount, description, date } = req.body;
  const transaction = new Transaction({
    amount,
    description,
    date,
  });
  await transaction.save();
  res.json({ message: "Transaction saved successfully!" });
});

router.patch("/:id", async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  await Transaction.updateOne({ _id: req.params.id }, { $set: req.body });
  res.json({ message: "Transaction updated successfully!" });
});

router.delete("/:id", async (req, res) => {
  await Transaction.deleteOne({ _id: req.params.id });
  res.json({ message: "Transaction deleted successfully!" });
});

export default router;
