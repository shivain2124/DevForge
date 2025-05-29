import express from 'express';
import { getCommentsForSnippet, addCommentToSnippet, updateCommentById, deleteCommentById } from '../controllers/Comment.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/snippets/:snippetId', getCommentsForSnippet);
router.post('/snippets/:snippetId', authenticate, addCommentToSnippet); 
router.put('/:id', authenticate, updateCommentById); 
router.delete('/:id', authenticate, deleteCommentById);

export default router;