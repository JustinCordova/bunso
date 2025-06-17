import express from 'express';
import mongoose from 'mongoose';
import slugify from 'slugify';


import Post from '../models/post.js'; 

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const posts = await Post.find();    
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
  try {
    const { title, body, snippet, ...rest } = req.body;

    if (!title || typeof title !== 'string') {
      return res.status(400).json({ message: 'Post title is required and must be a string.' });
    }

    const slug = slugify(title, { lower: true, strict: true });
    
    // Generate snippet if not provided: take the first 150 characters of the body plus '...' if body is longer.
    const generatedSnippet = snippet || (body ? body.substring(0, 150) + (body.length > 150 ? "..." : "") : "");

    const newPost = new Post({ title, body, snippet: generatedSnippet, slug, ...rest });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Create post error:', error.message);
    res.status(500).json({ message: error.message });
  }
};


export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, snippet, body, tags, selectedFile } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { title, snippet, body, tags, selectedFile, _id: id };

    const result = await Post.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(result);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Post.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await Post.findById(id);

    const updatedPost = await Post.findByIdAndUpdate(
      id, 
      { likeCount: post.likeCount + 1 }, 
      { new: true }
    );
    
    res.json(updatedPost);
}

export default router;
