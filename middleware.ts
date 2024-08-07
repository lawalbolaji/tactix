import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
    // No need for token refresh for login and register pages
    if (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/v2/register") return NextResponse.next();
    console.log("auth session refreshed from %s for path: %s", request.ip, request.nextUrl.pathname);

    return await updateSession(request);
}

export const config = {
    // matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
