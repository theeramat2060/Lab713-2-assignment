import express, { Request, Response } from 'express'
const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json('Hello World!')
})

app.get('/books', (req: Request, res: Response) => {
    if (req.query.title) {
        const title = req.query.title;
        const filteredBook = books.filter((book) => book.title === title);
        res.json(filteredBook);
    } else {
        res.json(books);
    }
})


app.get("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((book) => book.id === id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send("Event not found");
    }
});

app.post("/books", (req: Request, res: Response) => {
    const newBook: Book = req.body;
    if (newBook.id !== undefined) {
        const index = books.findIndex(b => b.id === newBook.id);
        if (index !== -1) {
            books[index] = newBook;
            return res.json({
                message: `Book updated (id: ${newBook.id})`,
                data: books[index],
            });
        }
    }
    newBook.id = books.length + 1;
    books.push(newBook);
    return res.json({
        message: "Book added",
        data: newBook,
    });
});



// app.get("/events", (req, res) => {
//     if (req.query.category) {
//         const category = req.query.category;
//         const filteredEvents = events.filter((event) => event.category === category);
//         res.json(filteredEvents);
//     } else {
//         res.json(events);
//     }
// });
//
// app.get("/events/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     const event = events.find((event) => event.id === id);
//     if (event) {
//         res.json(event);
//     } else {
//         res.status(404).send("Event not found");
//     }
// });

// app.post("/events", (req: Request, res: Response) => {
//     const newEvent: Event = req.body;
//     newEvent.id = events.length + 1;
//     events.push(newEvent);
//
//     res.json(newEvent);
// });




app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

interface Book {
    id: number;
    title: string;
    Author_name: string;
    description: string;
    groups: string[]; // e.g. genres or categories
}

const books: Book[] = [
    {
        id: 1,
        title: "Learning TypeScript",
        Author_name: "John Doe",
        description: "A practical guide to TypeScript for modern web development.",
        groups: ["Programming", "Web", "TypeScript"]
    },
    {
        id: 2,
        title: "Node.js in Action",
        Author_name: "Jane Smith",
        description: "Hands-on examples and best practices for building Node.js apps.",
        groups: ["Programming", "Backend", "Node.js"]
    },
    {
        id: 3,
        title: "Clean Code",
        Author_name: "Robert C. Martin",
        description: "A handbook of agile software craftsmanship.",
        groups: ["Programming", "Software Engineering", "Best Practices"]
    },
    {
        id: 4,
        title: "Clean Code IVT",
        Author_name: "Van C. Martin",
        description: "A handbook of agile software craftsmanship.",
        groups: ["Programming", "Software Engineering", "Best Practices"]
    }
]
// interface Event {
//     id: number;
//     category: string;
//     title: string;
//     description: string;
//     location: string;
//     date: string;
//     time: string;
//     petsAllowed: boolean;
//     organizer: string;
// }
// const events: Event[] = [
//     {
//         id: 1,
//         category: "Music",
//         title: "Concert",
//         description: "A live concert",
//         location: "London",
//         date: "2021-07-01",
//         time: "19:00",
//         petsAllowed: false,
//         organizer: "Live Nation",
//     },
//     {
//         id: 2,
//         category: "Art",
//         title: "Gallery Opening",
//         description: "Contemporary art exhibition opening night",
//         location: "Bangkok",
//         date: "2021-07-10",
//         time: "18:30",
//         petsAllowed: false,
//         organizer: "Bangkok Art Collective",
//     },
//     {
//         id: 3,
//         category: "Sports",
//         title: "Charity Run",
//         description: "5K charity run for local schools",
//         location: "Chiang Mai",
//         date: "2021-08-05",
//         time: "07:00",
//         petsAllowed: true,
//         organizer: "Run4Good",
//     },
//     {
//         id: 4,
//         category: "Food",
//         title: "Street Food Festival",
//         description: "A weekend of street food vendors and live music",
//         location: "Phuket",
//         date: "2021-09-12",
//         time: "12:00",
//         petsAllowed: false,
//         organizer: "Taste Phuket",
//     },
//     {
//         id: 5,
//         category: "Tech",
//         title: "Startup Meetup",
//         description: "Networking and pitch night for startups",
//         location: "Singapore",
//         date: "2021-10-01",
//         time: "19:00",
//         petsAllowed: false,
//         organizer: "TechHub SG",
//     },
//     {
//         id: 6,
//         category: "Education",
//         title: "Photography Workshop",
//         description: "Beginner photography workshop and field practice",
//         location: "Kuala Lumpur",
//         date: "2021-11-20",
//         time: "09:30",
//         petsAllowed: false,
//         organizer: "Capture Lab",
//     }
// ]

