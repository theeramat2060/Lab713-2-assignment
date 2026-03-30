import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/AuthService';

// Task 9: Middleware to protect routes
export const protect = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }

    const user = await authService.getUserFromToken(token);
    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Invalid token' });
    }

    req.body.user = user;
    next();
  } catch (error) {
    res.status(401).json({ status: 'error', message: 'Unauthorized' });
  }
};
