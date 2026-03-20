import { Router } from 'express';
import { mockLogin, getMe } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/authMiddleware';

export const authRouter = Router();

authRouter.post('/login', mockLogin);
authRouter.get('/me', authMiddleware, getMe);
