import express from 'express';
import { getAllEvents, getEventByCategory, getEventById, addEvent } from "./services/EventService.js";
const app = express();
app.use(express.json());
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get("/events/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const event = await getEventById(id);
    if (event) {
        res.json(event);
    }
    else {
        res.status(404).send("Event not found");
    }
});
app.get("/events", async (req, res) => {
    if (req.query.category) {
        const category = req.query.category;
        const filteredEvents = await getEventByCategory(category);
        res.json(filteredEvents);
    }
    else {
        res.json(await getAllEvents());
    }
});
app.post("/events", async (req, res) => {
    const newEvent = req.body;
    res.json(await addEvent(newEvent));
});
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
