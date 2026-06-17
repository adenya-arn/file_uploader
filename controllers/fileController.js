import prisma from "../db/prisma.js";

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
