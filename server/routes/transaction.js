import { Router } from "express";
import {
  index,
  store,
  update,
  destroy,
} from "../controllers/TransactionController.js";

const router = Router();

router.get("/", index);

router.post("/", store);

router.patch("/:id", update);

router.delete("/:id", destroy);

export default router;
