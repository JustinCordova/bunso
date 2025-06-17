import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  likePost,
  deletePost,
} from "../controllers/post.js";

import auth from "../middleware/auth.js";
import { apiLimiter } from "../middleware/rateLimiter.js";
import { postValidationRules, validate } from "../middleware/validators.js";

const router = express.Router();

// 🔓 Public Routes (Read only)
router.get("/", apiLimiter, getPosts);
router.get("/:id", apiLimiter, getPost);

// 🔒 Protected Routes (Temporarily removed auth)
router.post("/", apiLimiter, postValidationRules, validate, createPost);
router.patch("/:id", apiLimiter, postValidationRules, validate, updatePost);
router.delete("/:id", apiLimiter, deletePost);
router.patch("/:id/likePost", apiLimiter, likePost);

export default router;
