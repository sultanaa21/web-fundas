import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/cuenta";
    const errorQuery = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    if (errorQuery) {
        console.error("Auth error from Supabase:", errorQuery, errorDescription);
        return NextResponse.redirect(`${origin}/?error=${encodeURIComponent(errorDescription || "Authentication failed")}`);
    }

    if (code) {
        try {
            const supabase = createClient();
            const { error } = await supabase.auth.exchangeCodeForSession(code);

            if (!error) {
                // Validate 'next' parameter to prevent open redirect vulnerabilities
                const validNext = next.startsWith('/') ? next : '/cuenta';
                return NextResponse.redirect(`${origin}${validNext}`);
            }

            console.error("Auth callback exchange error:", error.message);
            return NextResponse.redirect(`${origin}/?error=${encodeURIComponent(error.message)}`);
        } catch (err) {
            console.error("Auth callback system error:", err);
            return NextResponse.redirect(`${origin}/?error=System error during authentication`);
        }
    }

    // Redirect to home page on failure/missing code
    return NextResponse.redirect(`${origin}/?error=No authorization code provided`);
}
