import express from "express";
import * as service from "../services/EventService";
const router = express.Router();
// Task 10-15: All endpoints with pagination, search, error handling
router.get("/", async (req, res) => {
    try {
        // Task 11: Default pagination values
        const pageSize = parseInt(req.query.pageSize) || 3;
        const pageNo = parseInt(req.query.pageNo) || 1;
        const keyword = req.query.keyword;
        // Task 11, 12: Get events with pagination and search
        const result = await service.getAllEventsWithPagination(keyword, pageSize, pageNo);
        // Task 13: Use HTTP response codes
        if (result.events.length === 0) {
            res.status(404).send("No event found");
            return;
        }
        // Task 10: Return count in header
        res.setHeader("x-total-count", result.count.toString());
        res.json(result.events);
    }
    catch (error) {
        // Task 14: Error handling with try-catch
        console.error("Error fetching events:", error);
        res.status(500).send("Internal server error");
    }
    finally {
        // Task 15: Finally block for logging
        const pageNo = parseInt(req.query.pageNo) || 1;
        const pageSize = parseInt(req.query.pageSize) || 3;
        console.log(`Request is completed. with pageNo=${pageNo} and pageSize=${pageSize}`);
    }
});
router.get("/events", async (req, res) => {
    try {
        console.log("getAllEventsWithPagination called with include");
        // Task 11: Default pagination values
        const pageSize = parseInt(req.query.pageSize) || 3;
        const pageNo = parseInt(req.query.pageNo) || 1;
        const keyword = req.query.keyword;
        // Task 11, 12: Get events with pagination and search
        const result = await service.getAllEventsWithPagination(keyword, pageSize, pageNo);
        // Task 13: Use HTTP response codes
        if (result.events.length === 0) {
            res.status(404).send("No event found");
            return;
        }
        // Task 10: Return count in header
        res.setHeader("x-total-count", result.count.toString());
        res.json(result.events);
    }
    catch (error) {
        // Task 14: Error handling with try-catch
        console.error("Error fetching events:", error);
        res.status(500).send("Internal server error");
    }
    finally {
        // Task 15: Finally block for logging
        const pageNo = parseInt(req.query.pageNo) || 1;
        const pageSize = parseInt(req.query.pageSize) || 3;
        console.log(`Request is completed. with pageNo=${pageNo} and pageSize=${pageSize}`);
    }
});
router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const event = await service.getEventById(id);
        if (event) {
            res.json(event);
        }
        else {
            res.status(404).send("Event not found");
        }
    }
    catch (error) {
        // Task 14: Error handling with try-catch
        console.error("Error fetching event:", error);
        res.status(500).send("Internal server error");
    }
    finally {
        // Task 15: Finally block for logging
        console.log(`Request to get event ${req.params.id} is completed`);
    }
});
router.post("/", async (req, res) => {
    try {
        const newEvent = req.body;
        const createdEvent = await service.addEvent(newEvent);
        res.status(201).json(createdEvent);
    }
    catch (error) {
        // Task 14: Error handling with try-catch
        console.error("Error creating event:", error);
        res.status(500).send("Internal server error");
    }
    finally {
        // Task 15: Finally block for logging
        console.log("Request to create event is completed");
    }
});
export default router;
