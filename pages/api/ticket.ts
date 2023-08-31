import { NextApiRequest, NextApiResponse } from "next";
import { db } from '@vercel/postgres';
import { processTicket } from "../services/ticketProcessor";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const _resp = await addData(req.body);
        res.status(200).json(_resp);
    }
    if (req.method === 'GET') {
        // await processTicket();
        const client = await db.connect();
       const data = await client.sql`SELECT * FROM tickets_eb`;
        res.status(200).json({data});
    }
}

const addData = async (data: any) => {
    const client = await db.connect();
    const payload = JSON.stringify(data);
    await client.sql`INSERT INTO tickets_eb (data) VALUES (${payload})`;
    const result = await client.sql`SELECT * FROM tickets_eb`;
    return {"success": true};
}