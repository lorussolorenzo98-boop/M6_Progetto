import express from "express"
import {findAll, findById, create, elimina, update, uploadCover } from "../controllers/blogPosts.js"
import parser from "../middlewares/cloudinary.js"
import { authentication } from "../middlewares/authentication.js"

const blogPostRouter = express.Router()

//definiamo le rotte
blogPostRouter.get('/', authentication, findAll)
blogPostRouter.get('/:id', authentication, findById)
blogPostRouter.post('/',authentication, create)
blogPostRouter.delete('/:id', authentication, elimina)
blogPostRouter.put('/:id', authentication, update)
blogPostRouter.patch('/:id/cover', authentication, parser.single('cover'), uploadCover)
export default blogPostRouter