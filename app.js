import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import indexRouter from "./routes/indexRouter.js";

import session from "express-session";
import passport from "passport";

import { PrismaSessionStore } from "@quixo3/prisma-session-store";

import prisma from "./db/prisma.js";

import "./config/passport.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },

    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,

      dbRecordIdIsSessionId: true,

      dbRecordIdFunction: undefined,
    }),
  }),
);

app.use(passport.initialize());

app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;

  next();
});

app.use("/", indexRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.post(
  "/login",

  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
});

app.get("/debug", (req, res) => {
  res.send(req.user);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});
