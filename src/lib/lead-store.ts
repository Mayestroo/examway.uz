import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type LeadType = "student" | "center";

export type LeadPayload = {
  type: LeadType;
  data: Record<string, string>;
};

export type StoredLead = {
  id: string;
  type: LeadType;
  data: Record<string, string>;
  submittedAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const leadsPath = path.join(dataDir, "leads.json");

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(leadsPath);
  } catch {
    await fs.writeFile(leadsPath, "[]", "utf8");
  }
}

export async function saveLead(payload: LeadPayload): Promise<StoredLead> {
  await ensureStore();
  const raw = await fs.readFile(leadsPath, "utf8");
  const current = JSON.parse(raw) as StoredLead[];

  const lead: StoredLead = {
    id: randomUUID(),
    type: payload.type,
    data: payload.data,
    submittedAt: new Date().toISOString(),
  };

  current.push(lead);
  await fs.writeFile(leadsPath, JSON.stringify(current, null, 2), "utf8");
  return lead;
}
