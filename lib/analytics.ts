const ANALYTICS_ENABLED = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";

export async function track(
  event: string,
  props?: Record<string, string | number | boolean>
): Promise<void> {
  if (!ANALYTICS_ENABLED) return;

  try {
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, props, ts: Date.now() }),
      keepalive: true,
    });
  } catch {
    // silently fail — analytics should never break UX
  }
}
