// import * as repo from "../repositories/EventRepository";
import * as repo from "../repositories/EventRepositoryDb.js";
export function getEventByCategory(category) {
    return repo.getEventByCategory(category);
}
export function getAllEvents() {
    return repo.getAllEvents();
}
export function getEventById(id) {
    return repo.getEventById(id);
}
export function addEvent(newEvent) {
    return repo.addEvent(newEvent);
}
