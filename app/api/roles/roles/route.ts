import { sql } from "@/lib/db";
import { NextResponse } from "next/server"

export async function GET() {
    const req = await sql`SELECT * FROM roles`
    return NextResponse.json(req)
}

export async function POST(req: Request) {
    try {
        const { label } = await req.json()

        if (!label) return NextResponse.json({ success: false, error: "Champs manquants !" }, { status: 400 });

        await sql`INSERT INTO roles (label) VALUES (${label})`;

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}