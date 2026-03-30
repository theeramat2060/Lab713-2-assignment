"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvents = createEvents;
const prisma_1 = require("../lib/prisma");
async function createEvents() {
    const chiangMaiOrg = await prisma_1.prisma.organizer.create({
        data: {
            name: 'Chiang Mai'
        }
    });
    const cmuOrg = await prisma_1.prisma.organizer.create({
        data: {
            name: 'Chiang Mai University'
        }
    });
    const camtOrg = await prisma_1.prisma.organizer.create({
        data: {
            name: 'CAMT'
        }
    });
    const events = [
        {
            category: "Music",
            title: "Concert",
            description: "A live concert",
            location: "London",
            date: "2021-07-01",
            time: "19:00",
            petsAllowed: false,
            organizer: chiangMaiOrg
        },
        {
            category: "Music",
            title: "Festival",
            description: "A music festival",
            location: "Manchester",
            date: "2021-07-15",
            time: "12:00",
            petsAllowed: false,
            organizer: cmuOrg
        },
        {
            category: "Sports",
            title: "Football Match",
            description: "A football match",
            location: "Liverpool",
            date: "2021-08-01",
            time: "15:00",
            petsAllowed: false,
            organizer: camtOrg
        },
        {
            category: "Music",
            title: "Jazz Night",
            description: "An evening of smooth jazz",
            location: "New Orleans",
            date: "2021-09-10",
            time: "19:00",
            petsAllowed: false,
            organizer: chiangMaiOrg
        },
        {
            category: "Theatre",
            title: "Shakespeare in the Park",
            description: "A performance of Hamlet",
            location: "Central Park",
            date: "2021-10-05",
            time: "18:00",
            petsAllowed: false,
            organizer: cmuOrg
        },
        {
            category: "Food",
            title: "Food Truck Festival",
            description: "A variety of food trucks offering delicious meals",
            location: "San Francisco",
            date: "2021-11-20",
            time: "12:00",
            petsAllowed: false,
            organizer: cmuOrg
        }
    ];
    for (const event of events) {
        // @ts-ignore
        await prisma_1.prisma.event.create({
            data: {
                category: event.category,
                title: event.title,
                description: event.description,
                location: event.location,
                date: event.date,
                time: event.time,
                petsAllowed: event.petsAllowed,
                organizerId: event.organizer.id
            }
        });
    }
    console.log("Database has been initialized with events.");
}
