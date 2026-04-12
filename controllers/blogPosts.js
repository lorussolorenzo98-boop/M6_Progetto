import mongoose from "mongoose";
import BlogPost from "../models/BlogPosts.js";

export async function findAll(req, res) {
    try {
        const {page, limit} = req.query
        const blogPostsQuery = BlogPost.find()
        if (page && limit) {
            blogPostsQuery.skip((page - 1) * limit).limit(limit)
        }
        const blogPosts = await blogPostsQuery
        res.status(200).json(blogPosts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function findById(req, res) {
    try {
        const { id } = req.params
        //faccio la validazione dell'ID 
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" })
        }
        const blogPost = await BlogPost.findById(id)
        if (!blogPost) {
            return res.status(404).json({ message: "Blog Post not found" })
        }
        res.status(200).json(blogPost)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}
export async function create(req, res) {
    try {
        const { category, title, cover, readTime, author, content } = req.body
        const blogPost = new BlogPost({ category, title, cover, readTime, author, content })
        const newBlogPost = await blogPost.save()
        res.status(201).json(newBlogPost)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export async function elimina(req, res) {
    try {
        const { id } = req.params
        //faccio la validazione dell'ID 
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" })
        }
        const deletedBlogPost = await BlogPost.findByIdAndDelete(id)
        if (!deletedBlogPost) {
            return res.status(404).json({ message: "blog post not found" })
        }
        res.status(200).json({ message: "blog Post deleted successfully" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export async function update(req, res) {
    try {
        const {id } = req.params
        //faccio la validazione dell'id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" })
        }
        const { category, title, cover, readTime, author, content } = req.body
        const updatedBlogPost = await BlogPost.findByIdAndUpdate(id, {category, title, cover, readTime, author, content}, {
            returnDocument: 'after'
        })
        if (!updatedBlogPost) {
            return res.status(404).json({message: "blog not found"})
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export async function uploadCover (req, res) {
    try {
        const {id} = req.params
         if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" })
        }
        if (!req.file) {
            return res.status(400).json({message: "invalid file"})
        }

        const blogPost = await BlogPost.findByIdAndUpdate(id, {cover: req.file.path}, {returnDocument: 'after'})
        res.status(200).json(blogPost)

    } catch (error) {
        res.status(500).json ({message: error.message})
    }
}