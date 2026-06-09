import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Analytics is gated behind an env flag
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== "true") {
    return NextResponse.json({ ok: true });
  }

  try {
    const body = await request.json();
    const { event, props, ts } = body;

    if (!event || typeof event !== "string") {
      return NextResponse.json({ error: "Missing event" }, { status: 400 });
    }

    // Log to stdout for now — can be extended to write to a DB or analytics service
    console.log(
      JSON.stringify({
        event,
        props: props || {},
        ts: ts || Date.now(),
        ip:
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          "unknown",
        ua: request.headers.get("user-agent")?.slice(0, 200) || "",
      })
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
