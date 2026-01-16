import { NextResponse } from "next/server";
import { saveLead, type LeadType } from "@/lib/lead-store";

type LeadRequest = {
  type?: LeadType;
  data?: Record<string, unknown>;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmpty(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeData(data: Record<string, unknown>) {
  const normalized: Record<string, string> = {};
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === "string") {
      normalized[key] = value.trim();
    }
  });
  return normalized;
}

function validateLead(type: LeadType, data: Record<string, string>) {
  if (!isNonEmpty(data.email) || !emailRegex.test(data.email)) {
    return "Invalid email.";
  }

  if (type === "student") {
    return null;
  }

  const required = ["name", "center", "phone"];
  for (const field of required) {
    if (!isNonEmpty(data[field])) {
      return `Missing ${field}.`;
    }
  }

  return null;
}

export async function POST(request: Request) {
  let payload: LeadRequest;
  try {
    payload = (await request.json()) as LeadRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const type = payload.type;
  if (type !== "student" && type !== "center") {
    return NextResponse.json({ error: "Invalid lead type." }, { status: 400 });
  }

  if (!payload.data || typeof payload.data !== "object") {
    return NextResponse.json({ error: "Missing lead data." }, { status: 400 });
  }

  const data = normalizeData(payload.data);
  const error = validateLead(type, data);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  await saveLead({ type, data });
  return NextResponse.json({ ok: true });
}
