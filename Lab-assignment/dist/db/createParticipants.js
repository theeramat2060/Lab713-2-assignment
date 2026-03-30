"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParticipants = createParticipants;
const prisma_1 = require("../lib/prisma");
async function createParticipants() {
    const participants = [
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
        },
        {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
        },
        {
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
        },
        {
            name: 'Bob Brown',
            email: 'bob.brown@example.com',
        },
        {
            name: 'Charlie Davis',
            email: 'charlie.davis@example.com',
        },
    ];
    for (const participant of participants) {
        await prisma_1.prisma.participant.create({
            data: participant,
        });
    }
    const responseParticipants = await prisma_1.prisma.participant.findMany();
    const responseEvents = await prisma_1.prisma.event.findMany();
    Promise.all([addEvent(responseParticipants[0].id, responseEvents[0].id),
        addEvent(responseParticipants[0].id, responseEvents[1].id),
        addEvent(responseParticipants[0].id, responseEvents[2].id),
        addEvent(responseParticipants[1].id, responseEvents[3].id),
        addEvent(responseParticipants[1].id, responseEvents[4].id),
        addEvent(responseParticipants[1].id, responseEvents[5].id),
        addEvent(responseParticipants[2].id, responseEvents[0].id),
        addEvent(responseParticipants[2].id, responseEvents[1].id),
        addEvent(responseParticipants[3].id, responseEvents[2].id),
        addEvent(responseParticipants[4].id, responseEvents[3].id),
        addEvent(responseParticipants[4].id, responseEvents[4].id),
        addEvent(responseParticipants[1].id, responseEvents[5].id)]).then(() => {
        Promise.all([
            prisma_1.prisma.participant.findMany({
                include: {
                    events: true
                }
            }),
            prisma_1.prisma.event.findMany({
                include: {
                    participants: true
                }
            })
        ]).then(([participantsWithEvents, eventsWithParticipants]) => {
            console.log("Participants with their Events:", JSON.stringify(participantsWithEvents, null, 2));
            console.log("Events with their Participants:", JSON.stringify(eventsWithParticipants, null, 2));
        });
    });
}
async function addEvent(participantId, eventId) {
    await prisma_1.prisma.participant.update({
        where: { id: participantId },
        data: {
            events: {
                connect: {
                    id: eventId,
                },
            },
        },
    });
}
