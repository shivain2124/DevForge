import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { register, login, refreshToken, logout, getMe } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware'

const router = Router();

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.post('/refresh', asyncHandler(refreshToken));
router.post('/logout', asyncHandler(authenticate), asyncHandler(logout));
router.get('/me', asyncHandler(authenticate), asyncHandler(getMe));

export default router;
