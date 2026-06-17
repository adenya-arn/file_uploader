import prisma from "../db/prisma.js";
import path from "node:path";
import multer from "multer";

export async function getFileById(id) {
  return prisma.file.findUnique({
    where: { id: Number(id) },
    include: {
      folder: true,
      user: true,
    },
  });
}

export async function fileDetailsGet(req, res) {
  const file = await prisma.file.findUnique({
    where: {
      id: Number(req.params.id),
    },
    include: {
      folder: true,
      user: true,
    },
  });

  if (!file) {
    return res.redirect("/");
  }
  res.render("file-details", {
    file,
  });
}

export async function downloadFile(req, res) {
  const file = await prisma.file.findUnique({
    where: { id: Number(req.params.id) },
  });

  if (!file) {
    return res.redirect("/");
  }

  const filePath = path.join(process.cwd(), file.fileUrl);

  res.download(filePath, file.name);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({
  storage,
});

export function uploadFileGet(req, res) {
  res.render("upload-form", {
    folderId: req.params.id,
  });
}

export async function uploadFilePost(req, res) {
  await prisma.file.create({
    data: {
      name: req.file.originalname,
      fileUrl: req.file.path,
      size: req.file.size,
      folderId: Number(req.params.id),
      userId: req.user.id,
    },
  });

  res.redirect(`/folders/${req.params.id}`);
}
