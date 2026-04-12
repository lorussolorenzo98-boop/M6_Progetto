import mongoose from "mongoose";
import BlogPost from "../models/BlogPosts.js";

export async function findAll(req, res) {
    try {
        const {blogPostId} = req.params
        if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
            return res.status(400).json({ message: "Invalid Blog post ID" })
        }
        const post = await BlogPost.findById(blogPostId)
        if (!post) {
            return res.status(404).json({message: "Blog post not found"})
        }
        res.status(200).json(post.comments)
    } catch (error){
        res.status(500).json({ message: error.message })
    }

}

export async function findById(req, res) {
    try {
        const {blogPostId, id} = req.params
        if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
            return res.status(400).json({ message: "Invalid Blog post ID" })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid comment ID" })
        }
        const blogPost = await BlogPost.findById(blogPostId)
        if(!blogPost) {
            return res.status(404).json({message: "post not found"})
        }
        const comment = blogPost.comments.id(id)
        if(!comment) {
            return res.status(404).json({message: "comment not found"})
        }
        res.status(200).json(comment)

    } catch (error){
        res.status(500).json({ message: error.message })
    }

}

export async function create(req, res) {
    try {
        const {blogPostId} = req.params
        if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
            return res.status(400).json({ message: "Invalid Blog post ID" })
        }
        const {text, author}= req.body
        const post = await BlogPost.findById(blogPostId)
        if(!post) {
            return res.status(404).json({message: "blog post not found"})
        }
        post.comments.push({
            text, 
            author
        })
        await post.save()
        res.status(200).json(post.comments[post.comments.length - 1])
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function elimina(req, res) {
    try {
        const {blogPostId, id} = req.params
        if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
            return res.status(400).json({ message: "Invalid Blog post ID" })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid comment ID" })
        }
        const blogPost = await BlogPost.findById(blogPostId)
        if(!blogPost) {
            return res.status(404).json({message: "post not found"})
        }
        const comment = blogPost.comments.id(id)
        if (!comment){
            return res.status(404).json({message: "comment not found"})
        }
        comment.deleteOne();
        await blogPost.save()
        res.status(200).json({message: "comment deleted successfully"})

    } catch (error){
        res.status(500).json({ message: error.message })
    }

}

export async function update(req, res) {
    try {
        const {blogPostId, id} = req.params
        const {text, author} = req.body
        if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
            return res.status(400).json({ message: "Invalid Blog post ID" })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid comment ID" })
        }
        const blogPost = await BlogPost.findById(blogPostId)
        if(!blogPostId) {
            return res.status(404)({message: "post not found"})
        }
        const comment = blogPost.comments.id(id)
        if (!comment) {
            return res.status(404).json({message: "comment not found"})
        }
        comment.text = text
        comment.author= author
        await blogPost.save()
        res.status(200).json(comment)
        

    } catch (error){
        res.status(500).json({ message: error.message })
    }

}