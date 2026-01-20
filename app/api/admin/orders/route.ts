import { NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const ADMIN_WHITELIST = ["caselyncontact@gmail.com"];

export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];

        // Verificar JWT con el cliente de Supabase (uso anon key para la verificación del usuario)
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { data: { user }, error: authError } = await supabase.auth.getUser(token);

        if (authError || !user) {
            return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
        }

        // Check whitelist
        if (!ADMIN_WHITELIST.includes(user.email || "")) {
            return NextResponse.json({ ok: false, error: "Forbidden: Not in whitelist" }, { status: 403 });
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
