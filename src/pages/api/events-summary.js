import pool from '../../lib/db'; // ✅ adjust this path if needed

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    const { start, end } = req.query;

    if (!start || !end) {
        return res.status(400).json({ success: false, error: 'Missing start or end date' });
    }

    try {
        // ✅ Check DB connection
        await pool.query('SELECT 1');

        const result = await pool.query(
            `
            SELECT 
                DATE(createdat) AS event_date,
                eventname, 
                COUNT(*) AS count
            FROM 
                EventsData
            WHERE 
                DATE(createdat) BETWEEN $1 AND $2
            GROUP BY 
                DATE(createdat), eventname
            ORDER BY 
                event_date ASC, count DESC;
            `,
            [start, end]
        );

        res.status(200).json({ success: true, data: result.rows });
    } catch (err) {
        console.error('Error in DB connection or query:', err);
        res.status(500).json({ success: false, error: 'Database error or connection issue' });
    }
}
