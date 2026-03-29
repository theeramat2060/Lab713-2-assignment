import * as repo from "../repositories/eventRepositoryPrisma.js";
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
// Task 10: Count total events
export function count() {
    return repo.countEvent();
}
// Task 11: Get all events with pagination and count
export function getAllEventsWithPagination(keyword, pageSize, pageNo) {
    return repo.getAllEventsWithPagination(keyword, pageSize, pageNo);
}
