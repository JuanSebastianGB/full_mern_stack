import express from 'express';
import {
  createPosts,
  deletePost,
  getPosts,
  likePost,
  updatePost,
} from '../controllers/postsController.js';
import auth from '../middleweare/auth.js';
const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, createPosts);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.put('/:id/like', auth, likePost);

export default router;
