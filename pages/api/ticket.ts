import { NextApiRequest, NextApiResponse } from "next";
import { db } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const _resp = await addData(req.body);
        res.status(200).json(_resp);
    }
    if (req.method === 'GET') {
        const client = await db.connect();
        const data = await client.sql`SELECT * FROM tickets`;
        res.status(200).json(data.rows);
    }
}

const addData = async (data: any) => {
    const client = await db.connect();
    const payload = JSON.stringify(data);
    await client.sql`INSERT INTO tickets (data) VALUES (${payload})`;
    const result = await client.sql`SELECT * FROM tickets`;
    return {"success": true};
}