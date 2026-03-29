import express from "express";
import eventRoute from "./routes/EventRoute";
const app = express();
app.use(express.json());
app.use('/events', eventRoute);
const port = 3000;
app.get('/', (req, res) => {
    res.json('Hello World!');
});
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
