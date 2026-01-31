import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
    user: 'admin',
    password: 'admin123',
    host: 'localhost',
    port: 5432,
    database: 'event'
});
export async function getEventByCategory(category) {
    const result = await pool.query('SELECT * FROM event WHERE category = $1', [category]);
    return result.rows;
}
export async function getAllEvents() {
    const result = await pool.query('SELECT * FROM event');
    return result.rows;
}
export async function getEventById(id) {
    const result = await pool.query('SELECT * FROM event WHERE id = $1', [id]);
    const events = result.rows;
    return events.length > 0 ? events[0] : undefined;
}
export async function addEvent(newEvent) {
    const { category, title, description, location, date, time, petsAllowed, organizer } = newEvent;
    const result = await pool.query('INSERT INTO event (category, title, description, location, date, time, petsAllowed, organizer) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [category, title, description, location, date, time, petsAllowed, organizer]);
    return result.rows[0];
}
