import express from "express"
import { findAll, findById, create, elimina, update, uploadAvatar} from "../controllers/authors.js"
import parser from "../middlewares/cloudinary.js"

const authorRouter = express.Router()
//definiamo le rotte
authorRouter.get('/', findAll)
authorRouter.get('/:id', findById)
authorRouter.post('/', create)
authorRouter.delete('/:id', elimina)
authorRouter.put('/:id', update)
authorRouter.patch('/:id/avatar', parser.single('avatar'), uploadAvatar)

export default authorRouter