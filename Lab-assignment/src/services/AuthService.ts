import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import type { RegisterRequest } from '../models/RegisterRequest';
import * as authRepo from '../repository/AuthRepository';

// Task 9: Get user from JWT token
export async function getUserFromToken(token: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    return authRepo.findByUserId(decoded.userId);
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// Find user by username
export function findByUsername(username: string) {
  return authRepo.findByUsername(username);
}

// Task 10: Register new user
export function registerUser(registerRequest: RegisterRequest) {
  const { organizerName, username, password } = registerRequest;
  return authRepo.registerUser(organizerName, username, bcrypt.hashSync(password), ['ROLE_USER']);
}

// Task 11: Update user password
export function updatePassword(userId: number, password: string) {
  return authRepo.updatePassword(userId, bcrypt.hashSync(password));
}
