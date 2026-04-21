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
        const user_id = await getUserIdBySessionId(session);

        console.log(challenge_id, flag_id, type);
        

        await sql`INSERT INTO flag_find (user_id, challenge_id, flag_id, type) VALUES (${user_id}, ${challenge_id}, ${flag_id}, ${type})`
        return NextResponse.json({ success: true })
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}