import express from "express"
import { findAll, findById, create, elimina, update, uploadAvatar} from "../controllers/authors.js"
import parser from "../middlewares/cloudinary.js"
import { authentication } from "../middlewares/authentication.js"

const authorRouter = express.Router()
//definiamo le rotte
authorRouter.get('/', authentication, findAll)
authorRouter.get('/:id', authentication, findById)
authorRouter.post('/', create)
authorRouter.delete('/:id', authentication, elimina)
authorRouter.put('/:id', authentication, update)
authorRouter.patch('/:id/avatar', authentication, parser.single('avatar'), uploadAvatar)

export default authorRouter