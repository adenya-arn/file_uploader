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
  folderDetailsGet,
} from "../controllers/folderController.js";

import { fileDetailsGet } from "../controllers/fileController.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";

import {
  downloadFile,
  upload,
  uploadFileGet,
  uploadFilePost,
} from "../controllers/fileController.js";

const router = Router();

router.get("/sign-up", signUpGet);

router.post("/sign-up", signUpPost);

router.get("/login", loginGet);

router.get("/folders", isAuthenticated, foldersGet);

router.get("/folders/new", isAuthenticated, createFolderGet);

router.post("/folders/new", isAuthenticated, createFolderPost);

router.get("/folders/:id", isAuthenticated, folderDetailsGet);

router.get("/folders/:id/download", isAuthenticated, downloadFile);

router.get("/folders/:id/upload", isAuthenticated, uploadFileGet);

router.post(
  "/folders/:id/upload",
  isAuthenticated,
  upload.single("file"),
  uploadFilePost,
);

router.get("/files/:id", isAuthenticated, fileDetailsGet);

router.get("/files/:id/download", isAuthenticated, downloadFile);

// router.get("/folders/:id", (req, res) => {
//   res.send(`Folder ID: ${req.params.id}`);
// });

export default router;
