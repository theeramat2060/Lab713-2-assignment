import {prisma} from '../src/prisma'
import {createEvents} from "../src/db/createEvents";  // Import createBooks
import {createParticipants} from "../src/db/createParticipants";

const seedData = async ()=> {
    await prisma.participant.deleteMany();
    await prisma.event.deleteMany();
    await prisma.organizer.deleteMany();
    await createEvents();
    await createParticipants();
}
await seedData();