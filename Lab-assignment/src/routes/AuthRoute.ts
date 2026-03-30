import express, { Request, Response } from 'express';
import * as authService from '../services/AuthService';
import * as authMiddleware from '../middleware/AuthMiddleware';
import type { RegisterRequest } from '../models/RegisterRequest';
import type { role } from '@prisma/client';

const router = express.Router();

// Task 10: Register new user
router.post('/register', async (req: Request, res: Response) => {
  const registerRequest: RegisterRequest = req.body;
  try {
    const response = await authService.registerUser(registerRequest);
    res.status(201).json({ status: 'success', message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Task 11: Update password
router.post('/updatePassword', authMiddleware.protect, async (req: any, res: Response) => {
  const user = req.body.user;
  const { password } = req.body;

  try {
    await authService.updatePassword(user.id, password);
    res.status(200).json({
      status: 'success',
      user: {
        id: user.id,
        organizerName: user.organizer?.name || 'unknown',
        username: user.username,
        roles: user.roles.map((role: role) => role.name),
      },
    });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

export default router;
