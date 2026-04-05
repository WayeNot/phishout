import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await sql`SELECT * FROM patchnote`

    const formattedData = data.map(item => ({
        ...item,
        created_at: new Date(item.created_at).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }));

    return NextResponse.json(formattedData);
}

export async function POST(req: Request) {
    const { feature } = await req.json()

    if (!feature) return NextResponse.json({ success: false, error: "Aucune feature renseignée !" }, { status: 400 })

    await sql`INSERT INTO patchnote (feature) VALUES (${feature})`
    return NextResponse.json({ success: true })
}