import express from "express"
import { findAll } from "../controllers/authors.js"

const authorRouter = express.Router()
//definiamo le rotte
authorRouter.get('/', findAll)

export default authorRouter