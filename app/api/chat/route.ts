// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { createChatAPIRoute } from "@/lib/chat/api";

export async function POST(req: Request) {
    const { status, data } = await createChatAPIRoute(req) as { status: number, data: any };
    return NextResponse.json(data, { status });
}