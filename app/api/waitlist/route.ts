import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { checkRateLimit } from "@/lib/rate-limit";
import { waitlistBodySchema } from "@/lib/validate";

export async function POST(request: NextRequest) {
  try {
    // Rate limit by IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const { allowed, remaining } = checkRateLimit(`waitlist:${ip}`);

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "X-RateLimit-Remaining": "0" } }
      );
    }

    // Parse and validate body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON" },
        { status: 400 }
      );
    }

    const parsed = waitlistBodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const { email, source, referrer, company } = parsed.data;

    // Honeypot: silently accept bot submissions
    if (company) {
      return NextResponse.json({ ok: true, status: "new" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Insert into Supabase
    const supabase = getSupabaseClient();

    const { error } = await supabase
      .from("waitlist")
      .insert({
        email: normalizedEmail,
        source: source || null,
        referrer: referrer?.slice(0, 500) || null,
        user_agent: request.headers.get("user-agent")?.slice(0, 500) || null,
      })
      .select("id")
      .single();

    if (error) {
      // Unique constraint violation = already on the list
      if (error.code === "23505") {
        return NextResponse.json(
          { ok: true, status: "existing" },
          { headers: { "X-RateLimit-Remaining": String(remaining) } }
        );
      }

      console.error("Waitlist insert error:", error);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { ok: true, status: "new" },
      { headers: { "X-RateLimit-Remaining": String(remaining) } }
    );
  } catch (err) {
    console.error("Waitlist API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
