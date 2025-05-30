import express from 'express';
import { generateShareLink, getSharedSnippet ,revokeSharing,getMySharedSnippets} from '../controllers/Sharing.controller';
import {authenticate} from '../middlewares/auth.middleware';

const router = express.Router();
// Generate share link for a snippet
router.post('/snippets/:id/share', authenticate, generateShareLink);
router.get('/share/:shareToken', getSharedSnippet);
router.delete('/snippets/:id/share', authenticate, revokeSharing);
router.get('/my/shared', authenticate, getMySharedSnippets); //current user ki shared snippets

export default router;