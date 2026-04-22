import { sql } from "@/lib/db";
import { getUserIdBySessionId } from "@/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type");
        const { challenge_id, flag_id } = await req.json()

        const cookieStore = await cookies();
        const session = cookieStore.get("session_id")?.value || "";
        const isGuest = cookieStore.get('isGuest')?.value || false;

        if (isGuest || !session) return NextResponse.json({ success: false, error: "Vous devez connecté pour faire ceci !"}, { status: 403 })

        const isGoodResult = await sql`SELECT coin_reward FROM flags WHERE challenge_id = ${challenge_id} AND id = ${flag_id} AND challenge_type = ${type}`
        
        const user_id = await getUserIdBySessionId(session);
        
        await sql`INSERT INTO flag_find (user_id, challenge_id, flag_id, type) VALUES (${user_id}, ${challenge_id}, ${flag_id}, ${type})`
        const currentCoin = await sql`UPDATE users SET coin = coin + ${isGoodResult[0].coin_reward} WHERE user_id = ${user_id} RETURNING coin`;
        
        return NextResponse.json({ success: true, currentCoin: currentCoin[0].coin })
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}