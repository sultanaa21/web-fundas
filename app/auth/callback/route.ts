import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/cuenta";

    if (code) {
        const supabase = createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            return NextResponse.redirect(`${origin}${next}`);
        }

        console.error("Auth callback error:", error.message);
    }

    // Redirect to home page on failure
    return NextResponse.redirect(`${origin}/`);
}
