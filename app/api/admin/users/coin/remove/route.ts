import { sql } from "@/lib/db";
import { getUserIdBySessionId } from "@/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { user_id, value, reason } = await req.json()

        const cookieStore = await cookies()
        const session_id = cookieStore.get('session_id')?.value
        let staff_id = await getUserIdBySessionId(session_id)

        if (!staff_id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const currentCoin = await sql`SELECT coin FROM users WHERE user_id = ${user_id}`;
        const newSold = currentCoin[0].coin - value
        if (newSold < 0) return NextResponse.json({ success: false, error: "Impossible de retirer plus que ce qu'il possède déjà !" }, { status: 500 })

        await sql`UPDATE users SET coin = ${newSold} WHERE user_id = ${user_id}`;
        await sql`INSERT INTO transactions (user_id, staff_id, amount, type, reason) VALUES (${Number(user_id)}, ${Number(staff_id)}, ${Number(value)}, 'remove_coin', ${reason || ""})`;

        return NextResponse.json({ newSold })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ success: false, error: "DB Error" }, { status: 500 })
    }
}