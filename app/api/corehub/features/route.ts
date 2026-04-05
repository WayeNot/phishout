import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const result = await sql`SELECT id, feature FROM features ORDER BY id DESC`
    return NextResponse.json(result)
}

export async function POST(req: Request) {
    const { text } = await req.json()    
    
    if ( !text ) return NextResponse.json({ success: false, error: "Aucune feature renseignée !" }, { status: 400 })

    const newFeature = await sql`INSERT INTO features (feature) VALUES (${text}) RETURNING *`
    return NextResponse.json(newFeature[0])
}

export async function DELETE(req: Request) {
    const { feature_id } = await req.json()
    
    if ( !feature_id ) return NextResponse.json({ success: false, error: "Aucune feature renseignée !" }, { status: 400 })

    await sql`DELETE FROM features WHERE id = ${feature_id}`
    return NextResponse.json({ success: true })
}