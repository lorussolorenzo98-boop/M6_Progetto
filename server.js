import express from "express"
import dotenv from "dotenv"
import { connect } from "./db.js";
import authorRouter from "./routes/authors.js";

dotenv.config()
connect()

const app = express();
app.get('/', (req, res) => {
    res.status(200).json({message:'ciao'})
})
app.use('/authors', authorRouter)
app.listen(process.env.PORT, () => {
    console.log("server in ascolto")
})