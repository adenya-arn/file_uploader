import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";

import prisma from "../db/prisma.js";

export function signUpGet(req, res) {
  res.render("sign-up");
}

const validateSignUp = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),

  body("lastName").trim().notEmpty().withMessage("Last name is required"),

  body("email").isEmail().withMessage("Enter a valid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }

    return true;
  }),
];

export const signUpPost = [
  validateSignUp,

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("sign-up", {
        errors: errors.array(),
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (existingUser) {
      return res.render("sign-up", {
        errors: [
          {
            msg: "Email already exists",
          },
        ],
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await prisma.user.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    res.redirect("/login");
  },
];
