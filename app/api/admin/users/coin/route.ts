import { sql } from "@/lib/db";
import { getUserIdBySessionId } from "@/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { user_id, value } = await req.json()
        const cookieStore = await cookies()
        const session_id = cookieStore.get('session_id')?.value
        const staff_id = getUserIdBySessionId(session_id)

        await sql`UPDATE users SET coin = ${value} WHERE user_id = ${user_id}`;
        await sql`INSERT INTO transactions (user_id, staff_id, amount, type, reference_id) VALUES (${user_id}, ${staff_id}, ${value}, '')`;
        return NextResponse.json({ success: true })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ success: false, error: "DB Error" }, { status: 500 })
    }
}