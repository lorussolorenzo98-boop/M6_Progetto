import Author from "../models/Author.js"

export async function findAll(req, res) {
    try {
        const authors = await Author.find()
        res.status(200).json(authors)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
}