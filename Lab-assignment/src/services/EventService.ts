import  Event  from "../models/Event.js";
// import * as repo from "../repositories/EventRepository";
import * as repo from "../repositories/EventRepositoryDb.js";

export function getEventByCategory(category: string): Promise<Event[]> {
      return repo.getEventByCategory(category);
}

export function getAllEvents(): Promise<Event[]> {
      return repo.getAllEvents();
}

export function getEventById(id: number): Promise<Event | undefined> {
      return repo.getEventById(id);
}

export function addEvent(newEvent: Event): Promise<Event> {
      return repo.addEvent(newEvent);
}
