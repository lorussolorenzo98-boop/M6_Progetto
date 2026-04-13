import express from "express"
import dotenv from "dotenv"
import { connect } from "./db.js";
import authorRouter from "./routes/authors.js";
import blogPostRouter from "./routes/blogPosts.js";
import cors from 'cors'
import commentsRouter from "./routes/comments.js";
import authRouter from "./routes/auth.js";
import passport from "passport"
import session from "express-session"
import "./middlewares/passport.js"

dotenv.config()
connect()

const app = express();
app.use(cors())
app.use(express.json()) //diciamo che tutto cio che arriva nel body deve essere codificato nel json
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.get('/', (req, res) => {
    res.status(200).json({ message: 'ciao' })
})
app.use('/authors', authorRouter)
app.use('/blogPosts', blogPostRouter)
app.use('/blogPosts/:blogPostId/comments', commentsRouter)
app.use('/auth', authRouter)
app.listen(process.env.PORT, () => {
    console.log("server in ascolto")
})