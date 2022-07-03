import express from 'express';
import {
  createPosts,
  deletePost,
  getPosts,
  likePost,
  updatePost,
} from '../controllers/postsController.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPosts);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/:id/like', likePost);

export default router;
