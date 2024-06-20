import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/v2/register") return NextResponse.next();
    console.log(
        "auth session refreshed from %s",
        request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip")
    );

    return await updateSession(request);
}

export const config = {
    // matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
