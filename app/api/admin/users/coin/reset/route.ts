import { sql } from "@/lib/db";
import { getUserIdBySessionId } from "@/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { user_id, reason } = await req.json()

        const cookieStore = await cookies()
        const session_id = cookieStore.get('session_id')?.value
        let staff_id = await getUserIdBySessionId(session_id)

        if (!staff_id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        await sql`UPDATE users SET coin = coin - coin WHERE user_id = ${user_id}`;
        await sql`INSERT INTO transactions (user_id, staff_id, amount, type, reason) VALUES (${Number(user_id)}, ${Number(staff_id)}, 0, 'reset_coin', ${reason || ""})`;

        return NextResponse.json({ sucess: true })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ success: false, error: "DB Error" }, { status: 500 })
    }
}