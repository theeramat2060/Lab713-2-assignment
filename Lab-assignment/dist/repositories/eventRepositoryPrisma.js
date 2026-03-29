import { prisma } from '../prisma';
import { Prisma } from "@prisma/client";
export function getEventByCategory(category) {
    return prisma.event.findMany({
        where: { category },
    });
}
export function getAllEvents() {
    return prisma.event.findMany({
        include: { organizer: true }
    });
}
export function getAllEventsWithOrganizer() {
    return prisma.event.findMany({
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
export function getAllEventsWithOrganizerPagination(pageSize, pageNo) {
    return prisma.event.findMany({
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
export function getEventById(id) {
    return prisma.event.findUnique({
        where: { id },
        select: {
            id: true,
            title: true,
            time: true,
            organizerId: true,
        }
    });
}
export function addEvent(newEvent) {
    return prisma.event.create({
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
// Task 10: Count total events
export function countEvent() {
    return prisma.event.count();
}
// Task 11 & 12: Get events with pagination and complex search
export async function getAllEventsWithPagination(keyword, pageSize, pageNo) {
    const where = keyword
        ? {
            OR: [
                { title: { contains: keyword, mode: Prisma.QueryMode.insensitive } },
                { description: { contains: keyword, mode: Prisma.QueryMode.insensitive } },
                { category: { contains: keyword, mode: Prisma.QueryMode.insensitive } }
            ]
        }
        : {};
    const [events, count] = await Promise.all([
        prisma.event.findMany({
            where,
            skip: pageSize * (pageNo - 1),
            take: pageSize
        }),
        prisma.event.count({ where })
    ]);
    return { count, events };
}
