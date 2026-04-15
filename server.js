import express from "express";
import dotenv from "dotenv";
import { connect } from "./db.js";
import authorRouter from "./routes/authors.js";
import blogPostRouter from "./routes/blogPosts.js";
import cors from "cors";
import commentsRouter from "./routes/comments.js";
import authRouter from "./routes/auth.js";
import passport from "passport";
import session from "express-session";
import "./middlewares/passport.js";

dotenv.config();
connect();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "https://striveblog-mu.vercel.app",
    ],
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.status(200).json({ message: "ciao" });
});

app.use("/authors", authorRouter);
app.use("/blogPosts", blogPostRouter);
app.use("/blogPosts/:blogPostId/comments", commentsRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server in ascolto sulla porta ${PORT}`);
});