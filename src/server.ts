import express, { Request, Response } from 'express'
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.json('Hello World!')
})

app.get('/book', (req: Request, res: Response) => {
    res.json(books);
})



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
    }
]
