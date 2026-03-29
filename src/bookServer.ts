// import express, { Request, Response } from 'express'
// const app = express()
// const port = 4000
//
// app.use(express.json());
//
// app.get('/', (req: Request, res: Response) => {
//     res.json('Hello World!')
// })
//
// app.get('/books', (req: Request, res: Response) => {
//     if (req.query.title) {
//         const title = req.query.title as string;
//         const filteredBook=getBookByTitle(title);
//         res.json(filteredBook);
//     }else {
//         res.json(getAllBooks());
//     }
// });
//
// app.get('/books/:id', (req: Request, res: Response) => {
//     const id = parseInt(req.params.id);
//     const book = getBookById(id);
//     if (book) {
//         res.json(book);
//     } else {
//         res.status(404).send("Book not found");
//     }
// });
//
//
//
// app.post("/books", (req: Request, res: Response) => {
//     const newBook: Book = req.body;
//     if (newBook.id !== undefined) {
//         const index = books.findIndex(b => b.id === newBook.id);
//         if (index !== -1) {
//             books[index] = newBook;
//             return res.json({
//                 message: `Book updated (id: ${newBook.id})`,
//                 data: books[index],
//             });
//         }
//     }
//     addBook(newBook);
//     return res.json({
//         message: "Book added",
//         data: newBook,
//     });
// });
//
// app.listen(port, () => {
//     console.log(`App listening at http://localhost:${port}`)
// })
//
// function getBookByTitle(title:string): Book[] {
//     const filteredBook = books.filter((book) => book.title === title);
//     return filteredBook;
// }
//
// function getAllBooks(): Book[] {
//     return books;
// }
//
// function getBookById(id: number): Book | undefined {
//     return  books.find((book) => book.id === id);
// }
//
// function addBook(newBook: Book): Book {
//     newBook.id = books.length + 1;
//     books.push(newBook);
//     return newBook;
// }
//
// interface Book {
//     id: number;
//     title: string;
//     Author_name: string;
//     description: string;
//     groups: string[]; // e.g. genres or categories
// }
//
// const books: Book[] = [
//     {
//         id: 1,
//         title: "Learning TypeScript",
//         Author_name: "John Doe",
//         description: "A practical guide to TypeScript for modern web development.",
//         groups: ["Programming", "Web", "TypeScript"]
//     },
//     {
//         id: 2,
//         title: "Node.js in Action",
//         Author_name: "Jane Smith",
//         description: "Hands-on examples and best practices for building Node.js apps.",
//         groups: ["Programming", "Backend", "Node.js"]
//     },
//     {
//         id: 3,
//         title: "Clean Code",
//         Author_name: "Robert C. Martin",
//         description: "A handbook of agile software craftsmanship.",
//         groups: ["Programming", "Software Engineering", "Best Practices"]
//     }
// ]