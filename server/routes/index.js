import { Router } from "express";
import TransactionRouter from "../routes/transaction.js";
import CategoryRouter from "../routes/category.js";
import AuthRouter from "../routes/auth.js";
import UserRouter from "../routes/user.js";
import { auth } from "../config/passport.js";

const router = Router();
router.use("/transactions", auth, TransactionRouter);
router.use("/categories", auth, CategoryRouter);
router.use("/auth", AuthRouter);
router.use("/me", auth, UserRouter);

export default router;
