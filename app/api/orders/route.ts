import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { customer_name, contact, address, items, total } = body ?? {};

        if (!customer_name || !contact || !items || typeof total !== "number") {
            return NextResponse.json(
                { ok: false, error: "Datos incompletos" },
                { status: 400 }
            );
        }

        const url = process.env.SUPABASE_URL!;
        const key = process.env.SUPABASE_ANON_KEY!; // anon JWT (eyJ...)

        const r = await fetch(`${url}/rest/v1/orders`, {
            method: "POST",
            headers: {
                apikey: key,
                Authorization: `Bearer ${key}`,
                "Content-Type": "application/json",
                Prefer: "return=representation",
            },
            body: JSON.stringify([
                { customer_name, contact, address: address ?? null, items, total, status: "pendiente" },
            ]),
        });

        const data = await r.json();

        if (!r.ok) {
            return NextResponse.json({ ok: false, supabase_error: data }, { status: 500 });
        }

        return NextResponse.json({ ok: true, order: data?.[0] }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ ok: false, error: "Error servidor" }, { status: 500 });
    }
}
