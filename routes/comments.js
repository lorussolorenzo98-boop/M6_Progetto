import express from "express"
import { findAll, findById, create, elimina, update} from "../controllers/comments.js"

const commentsRouter = express.Router({mergeParams: true})
//definiamo le rotte
commentsRouter.get('/', findAll)
commentsRouter.get('/:id', findById)
commentsRouter.post('/', create)
commentsRouter.delete('/:id', elimina)
commentsRouter.put('/:id', update)

export default commentsRouter