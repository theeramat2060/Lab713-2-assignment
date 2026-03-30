import { prisma } from '../lib/prisma';
import type { event } from "@prisma/client";
import type { PageEvent } from "../models/EventPage";
import { Prisma } from "@prisma/client";

export function getEventByCategory(category: string) {
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
        omit: {organizerId: true}
    });
}

export function getAllEventsWithOrganizerPagination(pageSize: number, pageNo: number) {
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

export function getEventById(id: number) {
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

export function addEvent(newEvent: Partial<event>): Promise<event> {
    return prisma.event.create({
        data: {
                category: newEvent.category!,
                title: newEvent.title!,
                description: newEvent.description!,
                location: newEvent.location!,
                date: newEvent.date!,
                time: newEvent.time!,
                petsAllowed: newEvent.petsAllowed!,
                organizerId: newEvent.organizerId
    }
    });
}

export function countEvent() {
    return prisma.event.count();
}

export async function getAllEventsWithPagination(
    keyword: string | undefined,
    pageSize: number,
    pageNo: number
): Promise<PageEvent> {
    const where: Prisma.eventWhereInput = keyword
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
