import express, { Request, Response } from 'express'
const app = express()
const port = 3000

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
        title: "Art Exhibition",
        description: "Modern art exhibition",
        location: "New York",
        date: "2021-08-15",
        time: "10:00",
        petsAllowed: true,
        organizer: "Art World",
    },
    {
        id: 3,
        category: "Tech",
        title: "Tech Conference",
        description: "Annual tech conference",
        location: "San Francisco",
        date: "2021-09-10",
        time: "09:00",
        petsAllowed: false,
        organizer: "Tech Corp",
    },
    {
        id: 4,
        category: "Food",
        title: "Food Festival",
        description: "A festival of food and drinks",
        location: "Paris",
        date: "2021-10-05",
        time: "12:00",
        petsAllowed: true,
        organizer: "Gourmet Events",
    },
    {
        id: 5,
        category: "Sports",
        title: "Marathon",
        description: "City marathon event",
        location: "Berlin",
        date: "2021-11-20",
        time: "07:00",
        petsAllowed: false,
        organizer: "Run Club",
    }
]


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

// app.get("/events", (req, res) => {
//     console.log("Query Params:", req.query);
//     const category = req.query.category;
//     const filteredEvents = events.filter((event) => event.category === category);
//     res.json(filteredEvents);
// });

app.get("/events", (req, res) => {
    if (req.query.category) {
        const category = req.query.category;
        const filteredEvents = events.filter((event) => event.category === category);
        res.json(filteredEvents);
    } else {
        res.json(events);
    }
});

app.get("/events/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const event = events.find((event) => event.id === id);
    if (event) {
        res.json(event);
    } else {
        res.status(404).send("Event not found");
    }
});



app.get('/test', (req, res) => {
       let returnObj = {
               name: 'test',
               age: 20,
               address: 'Thai'
       }
       res.send(returnObj);
})

app.get('/test', (req: Request, res: Response) => {
    const id = req.query.id;
    const output = `id: ${id}`;
    res.send(output);
})


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

