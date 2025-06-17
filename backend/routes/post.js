import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  likePost,
  deletePost,
} from '../controllers/post.js';

import auth from '../middleware/auth.js';

const router = express.Router();

// 🔓 Public Routes (Read only)
router.get('/', getPosts);
router.get('/:id', getPost);

// 🔒 Protected Routes (Requires login)
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;
