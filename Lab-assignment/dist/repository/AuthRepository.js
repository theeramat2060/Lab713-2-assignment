"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByUserId = findByUserId;
exports.findByUsername = findByUsername;
exports.registerUser = registerUser;
exports.updatePassword = updatePassword;
const prisma_1 = require("../lib/prisma");
// Task 9: Find user by ID with related data
function findByUserId(userId) {
    return prisma_1.prisma.user.findUnique({
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
function findByUsername(username) {
    return prisma_1.prisma.user.findUnique({
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
async function registerUser(organizerName, username, password, roleNames) {
    const roles = await prisma_1.prisma.role.findMany({
        where: {
            name: {
                in: roleNames,
            },
        },
    });
    return prisma_1.prisma.user.create({
        data: {
            username: username,
            password: password,
            roles: {
                connect: roles.map((role) => ({ id: role.id })),
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
async function updatePassword(userId, password) {
    return prisma_1.prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            password: password,
        },
    });
}
