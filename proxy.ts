import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sql } from "./lib/db";
import { getRole, getUserIdBySessionId } from "./lib/session";
import { maitenance_role } from "./lib/config";

export async function proxy(request: NextRequest) {
    const session_id = request.cookies.get("session_id")?.value;
    const path = request.nextUrl.pathname;

    const result = await sql`SELECT is_in_maintenance FROM settings LIMIT 1`;

    const user_id = await getUserIdBySessionId(session_id)

    if (result[0]?.is_in_maintenance && !maitenance_role.includes(user_id ? await getRole(user_id) : null) && path !== "/dev/maintenance") return NextResponse.redirect(new URL("/dev/maintenance", request.url));

    const isAuthPage = path.startsWith("/accounts");

    if (!session_id && !isAuthPage && path !== "/dev/maintenance") return NextResponse.redirect(new URL("/accounts/login", request.url));

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};