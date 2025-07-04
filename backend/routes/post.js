import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  likePost,
  deletePost,
  searchPosts,
} from "../controllers/post.js";

import auth from "../middleware/auth.js";
import { apiLimiter } from "../middleware/rateLimiter.js";
import { postValidationRules, validate } from "../middleware/validators.js";

const router = express.Router();

// Public Routes (Read only)
router.get("/search", apiLimiter, searchPosts);
router.get("/", apiLimiter, getPosts);
router.get("/:id", apiLimiter, getPost);

// Protected Routes
router.post("/", auth, apiLimiter, postValidationRules, validate, createPost);
router.patch(
  "/:id",
  auth,
  apiLimiter,
  postValidationRules,
  validate,
  updatePost
);
router.delete("/:id", auth, apiLimiter, deletePost);
router.patch("/:id/likePost", auth, apiLimiter, likePost);

export default router;
