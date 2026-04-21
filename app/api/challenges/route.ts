import { sql } from "@/lib/db";
import { NextResponse } from "next/server";
import { getUserIdBySessionId, hasRole } from "@/lib/session";
import { cookies } from 'next/headers'

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const challengeType = searchParams.get("type");

        if (challengeType === "ctf") {
            const result = await sql`SELECT * FROM ctf`;
            return NextResponse.json(result)
        }

        if (challengeType === "geoint") {
            const result = await sql`SELECT * FROM geoint`;
            return NextResponse.json(result)
        }

        return NextResponse.json({ success: false, error: "Type invalide !" }, { status: 400 })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ success: false, error: "DB Error" }, { status: 500 })
    }
}

export async function uploadFile(file: File) {
    const buffer = Buffer.from(await file.arrayBuffer());

    const fileName = `${randomUUID()}-${file.name.replace(/\s/g, "_")}`;

    await r2.send(
        new PutObjectCommand({
            Bucket: process.env.R2_BUCKET!,
            Key: fileName,
            Body: buffer,
            ContentType: file.type,
        })
    );

    return new URL(fileName, process.env.R2_PUBLIC_URL!).toString();
}

export async function POST(req: Request) {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("session_id")?.value || "";
        const user_id = await getUserIdBySessionId(session);

        if (!user_id) {
            return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
        }

        if (!(await hasRole("owner", user_id))) {
            return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
        }

        const form = await req.formData();

        if (type === "ctf") {
            const title = form.get("title") as string;
            const description = form.get("description") as string;
            const difficulty = form.get("difficulty") as string;
            const category = JSON.parse(form.get("category") as string);
            const flag_format = form.get("flag_format") as string;
            const files = form.getAll("files") as File[];
            const flags = JSON.parse(form.get("flags") as string);
            const coin_reward = JSON.parse(form.get("reward") as string);

            if (!title || !description || !difficulty || !category || !flag_format) {
                return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
            }

            const uploadedFiles = await Promise.all(
                files
                    .filter(f => f && f.size > 0)
                    .map(file => uploadFile(file))
            );

            const file_to_download = uploadedFiles.length > 0 ? uploadedFiles : null;

            const result = await sql`
                INSERT INTO ctf 
                (title, description, difficulty, category, flag_format, files, creator_id)
                VALUES 
                (${title}, ${description}, ${difficulty}, ${category}, ${flag_format}, ${file_to_download}, ${user_id})
                RETURNING id
            `;

            for (const flag of flags) await sql`INSERT INTO flags (challenge_id, challenge_type, title, flag, flag_format, description, hint, hint_cost, coin_reward) VALUES (${result[0].id}, ${type}, ${flag.title}, ${flag.flag}, ${flag.flag_format || "x"}, ${flag.description}, ${flag.hint}, ${flag.hint_cost || 0}, ${Number(coin_reward) || 0} )`

            return NextResponse.json({
                success: true,
                id: result[0].id,
            });
        }

        if (type === "geoint") {
            const data = JSON.parse(form.get("data") as string);

            const { title, description, difficulty, image, flag, hint, points } = data;

            if (!title || !description || !difficulty || !flag) {
                return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
            }

            const result = await sql`
                INSERT INTO geoint
                (title, description, image, difficulty, flag, hint, points)
                VALUES
                (${title}, ${description}, ${image}, ${difficulty}, ${flag}, ${hint}, ${points})
                RETURNING id
            `;

            return NextResponse.json({
                success: true,
                id: result[0].id,
            });
        }

        return NextResponse.json({ success: false, error: "Invalid type" }, { status: 400 });

    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}