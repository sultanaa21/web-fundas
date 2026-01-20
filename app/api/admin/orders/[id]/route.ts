import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const auth = req.headers.get("authorization");
        if (!auth || auth !== `Bearer ${process.env.ADMIN_TOKEN}`) {
            return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;
        const body = await req.json();
        const { status } = body ?? {};

        const allowed = ["pendiente", "en_produccion", "enviado", "cancelado"];
        if (!allowed.includes(status)) {
            return NextResponse.json({ ok: false, error: "Estado inválido" }, { status: 400 });
        }

        const url = process.env.SUPABASE_URL!;
        const service = process.env.SUPABASE_SERVICE_ROLE_KEY!;

        const r = await fetch(`${url}/rest/v1/orders?id=eq.${id}`, {
            method: "PATCH",
            headers: {
                apikey: service,
                Authorization: `Bearer ${service}`,
                "Content-Type": "application/json",
                Prefer: "return=representation",
            },
            body: JSON.stringify({ status }),
        });

        const data = await r.json();
        return NextResponse.json({ ok: r.ok, updated: data }, { status: r.status });
    } catch (e: any) {
        return NextResponse.json({ ok: false, error: e?.message ?? "Error" }, { status: 500 });
    }
}
