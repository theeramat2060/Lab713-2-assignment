import type { event as Event } from "../generated/prisma";
import * as repo from "../repository/eventRepositoryPrisma";
import {getAllEventsWithOrganizer} from "../repository/eventRepositoryPrisma";


export function getEventByCategory(category: string) {
      return repo.getEventByCategory(category);
}

export function getAllEvents() {
      return repo.getAllEventsWithOrganizer();
}

export function getEventById(id: number) {
    return repo.getEventById(id);
}

export function addEvent(newEvent: Event) {
      return repo.addEvent(newEvent);
}
