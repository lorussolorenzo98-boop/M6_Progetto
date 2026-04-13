import express from "express"
import { findAll, findById, create, elimina, update} from "../controllers/comments.js"
import { authentication } from "../middlewares/authentication.js"

const commentsRouter = express.Router({mergeParams: true})
//definiamo le rotte
commentsRouter.get('/', authentication, findAll)
commentsRouter.get('/:id', authentication, findById)
commentsRouter.post('/', authentication, create)
commentsRouter.delete('/:id', authentication, elimina)
commentsRouter.put('/:id', authentication, update)

export default commentsRouter