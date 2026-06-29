import prisma from "../db/prisma.js";
import path from "node:path";
import multer from "multer";
// import fs from "node:fs";
import cloudinary from "../config/cloudinary.js";

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

  res.redirect(file.fileUrl);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// ////////This gives:

// Maximum size = 5 MB
// JPG allowed
// PNG allowed
// PDF allowed
// TXT allowed//////
export const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter(req, file, cb) {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "text/plain",
      "pdf",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG, PDF and TXT files are allowed"));
    }
  },
});

export function uploadFileGet(req, res) {
  res.render("upload-form", {
    folderId: req.params.id,
  });
}

export async function uploadFilePost(req, res) {
  const result = await cloudinary.uploader.upload(req.file.path);

  await prisma.file.create({
    data: {
      name: req.file.originalname,
      fileUrl: result.secure_url,
      size: req.file.size,
      folderId: Number(req.params.id),
      userId: req.user.id,
    },
  });

  res.redirect(`/folders/${req.params.id}`);
}

// export async function uploadFilePost(req, res) {
//   try {
//     console.log("1. Request received");

//     const result = await cloudinary.uploader.upload(req.file.path);

//     console.log("2. Uploaded to Cloudinary");
//     console.log(result.secure_url);

//     await prisma.file.create({
//       data: {
//         name: req.file.originalname,
//         fileUrl: result.secure_url,
//         size: req.file.size,
//         folderId: Number(req.params.id),
//         userId: req.user.id,
//       },
//     });

//     console.log("3. Saved to database");

//     res.redirect(`/folders/${req.params.id}`);
//   } catch (err) {
//     console.error(err);
//     res.send(err);
//   }
// }

export async function deleteFilePost(req, res) {
  const file = await prisma.file.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  if (!file) {
    return res.redirect("/folders");
  }

  // try {
  //   fs.unlinkSync(file.fileUrl);
  // } catch (err) {
  //   console.log("Physical file already missing");
  // }

  await prisma.file.delete({
    where: {
      id: Number(req.params.id),
    },
  });

  res.redirect(`/folders/${file.folderId}`);
}
