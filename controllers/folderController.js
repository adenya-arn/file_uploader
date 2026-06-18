import prisma from "../db/prisma.js";

export async function foldersGet(req, res) {
  const folders = await prisma.folder.findMany({
    where: {
      userId: req.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.render("folders", {
    folders,
  });
}

export function createFolderGet(req, res) {
  res.render("folder-form", {
    folder: null,
  });
}

export async function createFolderPost(req, res) {
  await prisma.folder.create({
    data: {
      name: req.body.name,
      userId: req.user.id,
    },
  });

  res.redirect("/folders");
}

export async function folderDetailsGet(req, res) {
  const folder = await prisma.folder.findUnique({
    where: {
      id: Number(req.params.id),
    },

    include: {
      files: true,
    },
  });

  if (!folder) {
    return res.redirect("/folders");
  }

  res.render("folder", {
    folder,
  });
}

export async function editFolderGet(req, res) {
  const folder = await prisma.folder.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  res.render("folder-form", {
    folder,
  });
}

export async function editFolderPost(req, res) {
  await prisma.folder.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      name: req.body.name,
    },
  });

  res.redirect("/folders");
}

export async function deleteFolderPost(req, res) {
  const folder = await prisma.folder.findUnique({
    where: {
      id: Number(req.params.id),
    },

    include: {
      files: true,
    },
  });

  if (!folder) {
    return res.redirect("/folders");
  }

  for (const file of folder.files) {
    await prisma.file.delete({
      where: {
        id: file.id,
      },
    });
  }

  await prisma.folder.delete({
    where: {
      id: folder.id,
    },
  });

  res.redirect("/folders");
}
