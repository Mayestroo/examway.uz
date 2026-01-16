type AnalyticsPayload = Record<string, string | number | boolean | null>;

export function trackEvent(event: string, payload?: AnalyticsPayload) {
  if (typeof window === "undefined") return;
  const detail = payload ? JSON.stringify(payload) : "";
  // Placeholder analytics hook; replace with real tracking later.
  console.log(`[analytics] ${event}`, detail);
}
