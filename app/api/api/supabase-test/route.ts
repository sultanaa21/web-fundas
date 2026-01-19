import { NextResponse } from "next/server";

export async function GET() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;

    if (!url || !key) {
        return NextResponse.json(
            { ok: false, error: "Faltan variables SUPABASE_URL o SUPABASE_ANON_KEY en Vercel" },
            { status: 500 }
        );
    }

    const r = await fetch(`${url}/rest/v1/`, {
        headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
        },
    });

    return NextResponse.json({
        ok: true,
        status: r.status,
        nota:
            r.status === 401 || r.status === 403
                ? "❌ Key mala o Vercel no pilla variables"
                : "✅ Está conectando (aunque sea 404, es buena señal)",
    });
}