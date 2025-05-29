import express from 'express';
import {getAllPublicSnippets, getCurrentUserSnippets, getSnippetById, createNewSnippet, updateSnippetById, deleteSnippetById,toggleSnippetLike} from '../controllers/Snippet.controller';
import {authenticate} from '../middlewares/auth.middleware';

const router = express.Router();

//public
router.get('/', getAllPublicSnippets);
router.get('/:id', getSnippetById);

//protected
router.get('/my/snippets', authenticate, getCurrentUserSnippets);
router.post('/', authenticate, createNewSnippet);
router.put('/:id', authenticate, updateSnippetById);
router.delete('/:id', authenticate, deleteSnippetById);
router.post('/:id/like', authenticate, toggleSnippetLike);

export default router;