import { NextResponse } from "next/server";

/* healthcheck endpoint */
export async function GET(request: Request) {
    return NextResponse.json({ message: "okay" });
}
