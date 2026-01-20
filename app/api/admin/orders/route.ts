import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const auth = req.headers.get("authorization");
        if (!auth || auth !== `Bearer ${process.env.ADMIN_TOKEN}`) {
            return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
        }

        const url = process.env.SUPABASE_URL!;
        const service = process.env.SUPABASE_SERVICE_ROLE_KEY!;

        const r = await fetch(`${url}/rest/v1/orders?select=*&order=created_at.desc`, {
            headers: {
                apikey: service,
                Authorization: `Bearer ${service}`,
            },
            cache: "no-store",
        });

        const data = await r.json();
        return NextResponse.json({ ok: r.ok, orders: data }, { status: r.status });
    } catch (e: any) {
        return NextResponse.json({ ok: false, error: e?.message ?? "Error" }, { status: 500 });
    }
}
