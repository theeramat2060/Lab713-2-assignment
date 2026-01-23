import {prisma} from '../prisma';
// import type {Event} from '../models/Event';
// import type {eventModel as Event} from "../generated/prisma/models/event";
import type { event } from "../generated/prisma";

    export function getEventByCategory(category: string) {
      return prisma.event.findMany({
            where: { category },
      });
    }

    export function getAllEvents() {
      return prisma.event.findMany();
    }
    export function getAllEventsWithOrganizer() {
        return prisma.event.findMany({
            include: {organizer: true},
            omit: {organizerId: true}
    });
    }



export function getEventById(id: number) {
      return prisma.event.findUnique({
            where: { id },
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


