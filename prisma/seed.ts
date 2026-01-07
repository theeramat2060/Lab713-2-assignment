import {prisma} from '../src/prisma'
import {createEvents} from "../src/db/createEvents";  // Import createBooks

const seedData = async ()=> {
    await prisma.event.deleteMany();
    await prisma.organizer.deleteMany();
    await createEvents();
}
await seedData();