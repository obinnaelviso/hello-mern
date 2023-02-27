import { Router } from "express";
import { me } from "../controllers/UserController.js";
import { auth } from "../config/passport.js";

const router = Router();

router.get("/", auth, me);

export default router;
