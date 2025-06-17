import express from "express";
import mongoose from "mongoose";
import slugify from "slugify";
import logger from "../utils/logger.js";

import Post from "../models/post.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("creatorId", "name");
    res.status(200).json(posts);
  } catch (error) {
    logger.error("Error fetching posts", {
      error: error.message,
      stack: error.stack,
    });
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate("creatorId", "name");
    if (!post) {
      logger.warn("Post not found", { id });
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    logger.error("Error fetching post", {
      postId: id,
      error: error.message,
      stack: error.stack,
    });
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, body, snippet, selectedFile, ...rest } = req.body;

    // Validate image if present
    if (selectedFile) {
      try {
        // Basic validation of base64 string
        if (!selectedFile.startsWith("data:image/")) {
          throw new Error("Invalid image format");
        }
      } catch (error) {
        logger.error("Invalid image data", {
          error: error.message,
          stack: error.stack,
        });
        return res.status(400).json({ message: "Invalid image data" });
      }
    }

    const slug = slugify(title, { lower: true, strict: true });

    // Generate snippet if not provided
    const generatedSnippet =
      snippet ||
      (body ? body.substring(0, 150) + (body.length > 150 ? "..." : "") : "");

    const newPost = new Post({
      title,
      body,
      snippet: generatedSnippet,
      slug,
      selectedFile,
      ...rest,
    });

    await newPost.save();
    logger.info("Post created successfully", {
      postId: newPost._id,
      title,
      hasImage: !!selectedFile,
    });
    res.status(201).json(newPost);
  } catch (error) {
    logger.error("Error creating post", {
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      message: "Failed to create post",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    logger.warn("Invalid post ID format", { id });
    return res.status(400).json({ message: "Invalid post ID format" });
  }

  try {
    const existingPost = await Post.findById(id);
    if (!existingPost) {
      logger.warn("Post not found", { id });
      return res.status(404).json({ message: "Post not found" });
    }

    const { title, snippet, body, tags, selectedFile } = req.body;
    logger.info("Updating post", {
      postId: id,
      hasNewImage: !!selectedFile,
      imageLength: selectedFile ? selectedFile.length : 0,
    });

    // Validate image if present
    if (selectedFile) {
      try {
        // Basic validation of base64 string
        if (!selectedFile.startsWith("data:image/")) {
          throw new Error("Invalid image format");
        }
      } catch (error) {
        logger.error("Invalid image data in update", {
          postId: id,
          error: error.message,
          stack: error.stack,
        });
        return res.status(400).json({ message: "Invalid image data" });
      }
    }

    const updatedPost = {
      title,
      snippet,
      body,
      tags,
      selectedFile: selectedFile || "", // Always use the new selectedFile value
      creator: existingPost.creator,
      creatorId: existingPost.creatorId,
      _id: id,
    };

    logger.info("Updating post with data", {
      postId: id,
      hasImage: !!updatedPost.selectedFile,
      imageLength: updatedPost.selectedFile
        ? updatedPost.selectedFile.length
        : 0,
    });

    const result = await Post.findByIdAndUpdate(
      id,
      { $set: updatedPost },
      { new: true, runValidators: true }
    );

    logger.info("Post updated successfully", {
      postId: id,
      hasImage: !!result.selectedFile,
    });
    res.json(result);
  } catch (error) {
    logger.error("Error updating post", {
      postId: id,
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      message: "Failed to update post",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    logger.warn("Invalid post ID format for deletion", { id });
    return res.status(400).json({ message: "Invalid post ID format" });
  }

  try {
    const deleted = await Post.findByIdAndDelete(id);
    if (!deleted) {
      logger.warn("Post not found for deletion", { id });
      return res.status(404).json({ message: "Post not found" });
    }

    logger.info("Post deleted successfully", { postId: id });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    logger.error("Error deleting post", {
      postId: id,
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      message: "Failed to delete post",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    logger.warn("Invalid post ID format for like", { id });
    return res.status(404).json({ message: `No post with id: ${id}` });
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      logger.warn("Post not found for like", { id });
      return res.status(404).json({ message: "Post not found" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );

    logger.info("Post liked successfully", { postId: id });
    res.json(updatedPost);
  } catch (error) {
    logger.error("Error liking post", {
      postId: id,
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      message: "Failed to like post",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export default router;
