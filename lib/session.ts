import { randomBytes } from "crypto";
import { sql } from "./db";

export function generateSessionId() {
    return randomBytes(32).toString("hex")
}

export async function getUserIdBySessionId (session_id: any) {
    if (!session_id) return null;
    const result = await sql`SELECT user_id FROM user_session WHERE session_id = ${session_id}`
    return result[0]?.user_id ?? null
}

export async function getUserData (user_id: any) {
    return await sql`SELECT * FROM users WHERE user_id = ${user_id}`
}

export async function getRole (user_id: any) { 
    if (!user_id) return null
    const req = await sql`SELECT role FROM users WHERE user_id = ${await user_id}`
    return req[0]?.role ?? null
}

export async function hasRole(role: any, user_id: any) {
    if (!user_id || !role) return null    
    return (await getRole(user_id)).includes(role)
}