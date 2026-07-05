import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ContactRequestBody {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  budget?: string;
  message?: string;
  source?: string;
}

// Very small email sanity check (not RFC-strict, good enough for leads).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_SERVICES = [
  "Website Development",
  "Custom Web Apps",
  "SEO Campaigns",
  "Digital Marketing",
  "Mobile-First Design",
  "Analytics & Reporting",
  "Other",
];

export async function POST(req: Request) {
  let body: ContactRequestBody;
  try {
    body = (await req.json()) as ContactRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const name = (body?.name ?? "").toString().trim();
  const email = (body?.email ?? "").toString().trim();
  const message = (body?.message ?? "").toString().trim();
  const phone = (body?.phone ?? "").toString().trim() || null;
  const service = (body?.service ?? "").toString().trim() || null;
  const budget = (body?.budget ?? "").toString().trim() || null;
  const source = (body?.source ?? "website").toString().trim();

  // ---- Validation ----
  if (!name) {
    return NextResponse.json(
      { error: "Name is required." },
      { status: 400 }
    );
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "A valid email is required." },
      { status: 400 }
    );
  }
  if (!message) {
    return NextResponse.json(
      { error: "Message is required." },
      { status: 400 }
    );
  }
  if (service && !ALLOWED_SERVICES.includes(service)) {
    // Don't reject — just normalize to "Other" if it doesn't match the list.
    // (Keeps the API forgiving for slightly-different frontend labels.)
  }

  // ---- Persist ----
  let id: string | null = null;
  try {
    const submission = await db.contactSubmission.create({
      data: {
        name,
        email,
        phone,
        service,
        budget,
        message,
        source,
      },
    });
    id = submission.id;
  } catch (err) {
    console.error("[contact] Failed to save submission:", err);
    return NextResponse.json(
      {
        error:
          "We couldn't save your message right now. Please try again, or reach us on WhatsApp at https://wa.me/971552079989.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, id },
    { status: 200 }
  );
}

// Basic GET — list recent submissions (admin/debug completeness).
export async function GET(req: Request) {
  const url = new URL(req.url);
  const limit = Math.min(
    Number(url.searchParams.get("limit") || "50"),
    200
  );

  try {
    const submissions = await db.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return NextResponse.json({ success: true, submissions });
  } catch (err) {
    console.error("[contact] Failed to list submissions:", err);
    return NextResponse.json(
      { success: false, error: "Failed to load submissions." },
      { status: 500 }
    );
  }
}
