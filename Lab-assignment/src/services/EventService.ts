import Event from "../models/Event.js";
import * as repo from "../repositories/eventRepositoryPrisma.js";
import type { PageEvent } from "../models/EventPage";

export function getEventByCategory(category: string) {
      return repo.getEventByCategory(category);
}

export function getAllEvents() {
      return repo.getAllEvents();
}

export function getEventById(id: number) {
      return repo.getEventById(id);
}

export function addEvent(newEvent: Event) {
      return repo.addEvent(newEvent);
}

export function count() {
      return repo.countEvent();
}

export function getAllEventsWithPagination(
      keyword: string | undefined,
      pageSize: number,
      pageNo: number
): Promise<PageEvent> {
      return repo.getAllEventsWithPagination(keyword, pageSize, pageNo);
}
