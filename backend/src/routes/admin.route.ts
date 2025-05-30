import express from 'express';
import { adminDeleteSnippet,  adminDeleteComment, getAdminStats } from '../controllers/Admin.controller'
import { authenticate } from '../middlewares/auth.middleware';
import { adminMiddleware } from '../middlewares/admin.middleware';

const router=express.Router();

router.delete('/snippets/:id',authenticate,adminMiddleware,adminDeleteSnippet);
router.delete('/comments/:id',authenticate,adminMiddleware,adminDeleteComment);
router.get('/stats',authenticate,adminMiddleware,getAdminStats);

export default router;