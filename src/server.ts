import express, { Request, Response } from 'express'
const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json('Hello World!')
})

function getEventByCategory(category:string): Event[] {
      const filteredEvents = events.filter((event) => event.category === category);
      return filteredEvents;
    }

function getAllEvents(): Event[] {
      return events;
    }

function getEventById(id: number): Event | undefined {
      return events.find((event) => event.id === id);
    }

function addEvent(newEvent: Event): Event {
      newEvent.id = events.length + 1;
      events.push(newEvent);
      return newEvent;
    }


app.get("/events", (req, res) => {
    if (req.query.category) {
        const category = req.query.category as string;
           const filteredEvents = getEventByCategory(category);
        res.json(filteredEvents);
    } else {
            res.json(getAllEvents());
    }
});


app.get("/events/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const event = getEventById(id);
    if (event) {
        res.json(event);
    } else {
        res.status(404).send("Event not found");
    }
});


app.post("/events", (req: Request, res: Response) => {
    const newEvent: Event = req.body;
        addEvent(newEvent);
    res.json(newEvent);
});


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

interface Event {
    id: number;
    category: string;
    title: string;
    description: string;
    location: string;
    date: string;
    time: string;
    petsAllowed: boolean;
    organizer: string;
}
const events: Event[] = [
    {
        id: 1,
        category: "Music",
        title: "Concert",
        description: "A live concert",
        location: "London",
        date: "2021-07-01",
        time: "19:00",
        petsAllowed: false,
        organizer: "Live Nation",
    },
    {
        id: 2,
        category: "Art",
        title: "Gallery Opening",
        description: "Contemporary art exhibition opening night",
        location: "Bangkok",
        date: "2021-07-10",
        time: "18:30",
        petsAllowed: false,
        organizer: "Bangkok Art Collective",
    },
    {
        id: 3,
        category: "Sports",
        title: "Charity Run",
        description: "5K charity run for local schools",
        location: "Chiang Mai",
        date: "2021-08-05",
        time: "07:00",
        petsAllowed: true,
        organizer: "Run4Good",
    },
    {
        id: 4,
        category: "Food",
        title: "Street Food Festival",
        description: "A weekend of street food vendors and live music",
        location: "Phuket",
        date: "2021-09-12",
        time: "12:00",
        petsAllowed: false,
        organizer: "Taste Phuket",
    },
    {
        id: 5,
        category: "Tech",
        title: "Startup Meetup",
        description: "Networking and pitch night for startups",
        location: "Singapore",
        date: "2021-10-01",
        time: "19:00",
        petsAllowed: false,
        organizer: "TechHub SG",
    },
    {
        id: 6,
        category: "Education",
        title: "Photography Workshop",
        description: "Beginner photography workshop and field practice",
        location: "Kuala Lumpur",
        date: "2021-11-20",
        time: "09:30",
        petsAllowed: false,
        organizer: "Capture Lab",
    }
]

