import { NextResponse } from "next/server";

/* healthcheck endpoint */
export async function GET(request: Request) {
    const origin = request.headers.get("x-forwarded-for");
    console.log("healthcheck request, at %s from %s", new Date(), origin);
    return NextResponse.json({ message: "okay" });
}
