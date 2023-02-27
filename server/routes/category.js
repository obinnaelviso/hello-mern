import { Router } from "express";
import { create, update, destroy } from "../controllers/CategoryController.js";

const router = Router();

router.post("/", create);

router.patch("/:id", update);

router.delete("/:id", destroy);

export default router;
