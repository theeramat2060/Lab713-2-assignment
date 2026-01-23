import {createEvents} from '../src/db/createEvents';
import {prisma} from '../src/lib/prisma'

prisma.event.deleteMany().then(() => {
    createEvents()
        .catch((e) => {
            console.error(e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
})

