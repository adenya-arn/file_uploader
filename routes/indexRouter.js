import { Router } from "express";

import {
  signUpGet,
  signUpPost,
  loginGet,
} from "../controllers/authController.js";

const router = Router();

router.get("/sign-up", signUpGet);

router.post("/sign-up", signUpPost);

router.get("/login", loginGet);

export default router;
