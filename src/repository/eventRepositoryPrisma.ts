import {prisma} from '../prisma';
import type { event } from "../generated/prisma";

    export function getEventByCategory(category: string) {
      return prisma.event.findMany({
            where: { category },
      });
    }

    export function getAllEvents() {
        console.log("getAllEvents called with include");
        return prisma.event.findMany({
            include: { organizer: true }
        });
    }
    // export function getAllEventsWithOrganizer() {
    //     console.log("getAllEvents called with include");
    //     return prisma.event.findMany({
    //         include: {
    //             organizer: {
    //                 select: {
    //                     name: true,
    //                 },
    //             },
    //         },
    //         omit: {organizerId: true}
    //     });
    // }
    export function getAllEventsWithOrganizer() {
        return prisma.event.findMany({
            select: {
                id: true,
                category: true,
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

    export function addEvent(newEvent: event): Promise<event> {
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


