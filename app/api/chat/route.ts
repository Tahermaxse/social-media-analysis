// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { createChatAPIRoute } from "@/lib/chat/api";

export async function POST(req: Request) {
    const { status, data } = await createChatAPIRoute(req);
    return NextResponse.json(data, { status });
}