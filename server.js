import express from "express"
import dotenv from "dotenv"
import { connect } from "./db.js";
import authorRouter from "./routes/authors.js";
import blogPostRouter from "./routes/blogPosts.js";

dotenv.config()
connect()

const app = express();
app.use(express.json()) //diciamo che tutto cio che arriva nel body deve essere codificato nel json
app.get('/', (req, res) => {
    res.status(200).json({message:'ciao'})
})
app.use('/authors', authorRouter)
app.use('/blogPosts', blogPostRouter)
app.listen(process.env.PORT, () => {
    console.log("server in ascolto")
})