import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const res = NextResponse.json({ success: true })
    res.cookies.set("isGuest", "true")
    return res
}