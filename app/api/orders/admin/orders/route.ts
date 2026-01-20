import { NextResponse } from "next/server";

function isAuthorized(req: Request) {
    const token = req.headers.get("x-admin-token");
    return token && token === process.env.ADMIN_TOKEN;
}

export async function GET(req: Request) {
    try {
        if (!isAuthorized(req)) {
            return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
        }

        const url = process.env.SUPABASE_URL;
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!url || !serviceKey) {
            return NextResponse.json(
                { ok: false, error: "Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en Vercel" },
                { status: 500 }
            );
        }

        // Trae pedidos ordenados por fecha (últimos primero)
        const r = await fetch(
            `${url}/rest/v1/orders?select=*&order=created_at.desc`,
            {
                headers: {
                    apikey: serviceKey,
                    Authorization: `Bearer ${serviceKey}`,
                },
                cache: "no-store",
            }
        );

        const data = await r.json();

        if (!r.ok) {
            return NextResponse.json(
                { ok: false, error: data },
                { status: r.status }
            );
        }

        return NextResponse.json({ ok: true, orders: data }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
    }
}
