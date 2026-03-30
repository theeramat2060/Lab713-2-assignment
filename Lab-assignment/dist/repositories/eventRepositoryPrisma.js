"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventByCategory = getEventByCategory;
exports.getAllEvents = getAllEvents;
exports.getAllEventsWithOrganizer = getAllEventsWithOrganizer;
exports.getAllEventsWithOrganizerPagination = getAllEventsWithOrganizerPagination;
exports.getEventById = getEventById;
exports.addEvent = addEvent;
exports.countEvent = countEvent;
exports.getAllEventsWithPagination = getAllEventsWithPagination;
const prisma_1 = require("../lib/prisma");
const client_1 = require("@prisma/client");
function getEventByCategory(category) {
    return prisma_1.prisma.event.findMany({
        where: { category },
    });
}
function getAllEvents() {
    return prisma_1.prisma.event.findMany({
        include: { organizer: true }
    });
}
function getAllEventsWithOrganizer() {
    return prisma_1.prisma.event.findMany({
        include: {
            organizer: {
                select: {
                    name: true,
                },
            },
            participants: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    events: true,
                },
            },
        },
        omit: { organizerId: true }
    });
}
function getAllEventsWithOrganizerPagination(pageSize, pageNo) {
    return prisma_1.prisma.event.findMany({
        skip: pageSize * (pageNo - 1),
        take: pageSize,
        select: {
            id: true,
            category: true,
            title: true,
            organizerId: false,
            organizer: {
                select: {
                    name: true
                }
            }
        }
    });
}
function getEventById(id) {
    return prisma_1.prisma.event.findUnique({
        where: { id },
        select: {
            id: true,
            title: true,
            time: true,
            organizerId: true,
        }
    });
}
function addEvent(newEvent) {
    return prisma_1.prisma.event.create({
        data: {
            category: newEvent.category,
            title: newEvent.title,
            description: newEvent.description,
            location: newEvent.location,
            date: newEvent.date,
            time: newEvent.time,
            petsAllowed: newEvent.petsAllowed,
            organizerId: newEvent.organizerId
        }
    });
}
function countEvent() {
    return prisma_1.prisma.event.count();
}
async function getAllEventsWithPagination(keyword, pageSize, pageNo) {
    const where = keyword
        ? {
            OR: [
                { title: { contains: keyword, mode: client_1.Prisma.QueryMode.insensitive } },
                { description: { contains: keyword, mode: client_1.Prisma.QueryMode.insensitive } },
                { category: { contains: keyword, mode: client_1.Prisma.QueryMode.insensitive } }
            ]
        }
        : {};
    const [events, count] = await Promise.all([
        prisma_1.prisma.event.findMany({
            where,
            skip: pageSize * (pageNo - 1),
            take: pageSize
        }),
        prisma_1.prisma.event.count({ where })
    ]);
    return { count, events };
}
