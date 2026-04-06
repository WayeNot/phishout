import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const req = await sql`SELECT * FROM ctf`;
    return NextResponse.json(req)
}