import express, {Request, Response} from "express";
import * as service from "../services/EventService";
import type { event } from "../generated/prisma";
import exp from "constants";
const router = express.Router();




    router.get("/:id", async (req, res) => {
            const id = parseInt(req.params.id);
            const event = await service.getEventById(id);
            if (event) {
                    res.json(event);
                } else {
                    res.status(404).send("Event not found");
                }
        });

    router.get("/", async(req, res) => {
            if (req.query.category) {
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

    export default router;

