import express, {Request, Response} from "express";
import * as service from "../services/EventService";
import type { event } from "../generated/prisma";
import exp from "constants";
const router = express.Router();





    router.get("/", async(req, res) => {
            if (req.query.category) {
                    const category = req.query.category as string;
                    const filteredEvents = await service.getEventByCategory(category);
                    res.json(filteredEvents);
                } else {
                    res.json(await service.getAllEvents());
                }
    });

    router.get("/events", async(req, res) => {
        console.log("getAllEventsWithPagination called with include");
        if (req.query.pageSize && req.query.pageNo) {
            const pageSize = parseInt(req.query.pageSize as string);
            const pageNo = parseInt(req.query.pageNo as string);
            res.json(await service.getAllEventsWithPagination(pageSize, pageNo));
        } else if (req.query.category) {
            const category = req.query.category as string;
            const filteredEvents = await service.getEventByCategory(category);
            res.json(filteredEvents);
        } else {
            res.json(await service.getAllEvents());
        }
    });

    router.post("/", async (req, res) => {
            const newEvent: event = req.body;
        
                res.json(await service.addEvent(newEvent));
        });
    router.get("/:id", async (req, res) => {
        const id = parseInt(req.params.id);
        const event = await service.getEventById(id);
        if (event) {
            res.json(event);
        } else {
            res.status(404).send("Event not found");
        }
    });



export default router;

