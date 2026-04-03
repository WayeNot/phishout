'use server'
import { cookies } from 'next/headers'
import { getUserData, getUserIdBySessionId } from '../user/route'
import { sql } from '@/lib/db'

export async function GET() {
    const cookie = await cookies()
    const session = cookie.get('session_id')?.value || ""
    if ( !session ) return Response.json("")
    const user_id = await getUserIdBySessionId(session)    
    const userData = await getUserData(user_id)
    return Response.json({ userData })
}

export async function DELETE() {
    console.log("YEPP");
    
    const cookie = await cookies()
    const session = cookie.get('session_id')?.value
    if (!session) return Response.json({ success: false })
    sql`UPDATE user_session SET is_active = FALSE WHERE session_id = ${session}`
    cookie.delete('session_id')
    return Response.json({ success: true })
}