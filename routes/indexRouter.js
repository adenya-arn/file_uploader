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
  editFolderGet,
  editFolderPost,
  deleteFolderPost,
} from "../controllers/folderController.js";

import {
  upload,
  uploadFileGet,
  uploadFilePost,
  fileDetailsGet,
  downloadFile,
  deleteFilePost,
} from "../controllers/fileController.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

//
// Authentication
//

router.get("/sign-up", signUpGet);
router.post("/sign-up", signUpPost);

router.get("/login", loginGet);

//
// Folder Routes
//

router.get("/folders", isAuthenticated, foldersGet);

router.get("/folders/new", isAuthenticated, createFolderGet);
router.post("/folders/new", isAuthenticated, createFolderPost);

router.get("/folders/:id", isAuthenticated, folderDetailsGet);

router.get("/folders/:id/edit", isAuthenticated, editFolderGet);
router.post("/folders/:id/edit", isAuthenticated, editFolderPost);

router.post("/folders/:id/delete", isAuthenticated, deleteFolderPost);

//
// File Routes
//

router.get("/folders/:id/upload", isAuthenticated, uploadFileGet);

router.post(
  "/folders/:id/upload",
  isAuthenticated,
  upload.single("file"),
  uploadFilePost,
);

router.get("/files/:id", isAuthenticated, fileDetailsGet);

router.get("/files/:id/download", isAuthenticated, downloadFile);

router.post("/files/:id/delete", isAuthenticated, deleteFilePost);

export default router;
