import { prisma } from '../lib/prisma';
import type { role } from '@prisma/client';

// Task 9: Find user by ID with related data
export function findByUserId(userId: number) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      roles: true,
      organizer: {
        include: {
          events: true,
        },
      },
    },
  });
}

// Find user by username
export function findByUsername(username: string) {
  return prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      roles: true,
      organizer: {
        include: {
          events: true,
        },
      },
    },
  });
}

// Task 10: Register new user
export async function registerUser(organizerName: string, username: string, password: string, roleNames: string[]) {
  const roles = await prisma.role.findMany({
    where: {
      name: {
        in: roleNames,
      },
    },
  });

  return prisma.user.create({
    data: {
      username: username,
      password: password,
      roles: {
        connect: roles.map((role: role) => ({ id: role.id })),
      },
      organizer: {
        create: {
          name: organizerName,
        },
      },
    },
  });
}

// Task 11: Update user password
export async function updatePassword(userId: number, password: string) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: password,
    },
  });
}
