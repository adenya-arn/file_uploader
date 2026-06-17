import { Router } from "express";

import {
  signUpGet,
  signUpPost,
  loginGet,
} from "../controllers/authController.js";

import {
  foldersGet,
  createFolderGet,
  createFolderPost,
} from "../controllers/folderController.js";

import { fileDetailsGet } from "../controllers/fileController.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/sign-up", signUpGet);

router.post("/sign-up", signUpPost);

router.get("/login", loginGet);

router.get("/folders", isAuthenticated, foldersGet);

router.get("/folders/new", isAuthenticated, createFolderGet);

router.post("/folders/new", isAuthenticated, createFolderPost);

router.get("files/:id", isAuthenticated, fileDetailsGet);

export default router;
