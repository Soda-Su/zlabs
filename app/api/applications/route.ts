import { NextResponse } from "next/server";

export const runtime = "nodejs";

const requiredFields = [
  "fullName",
  "email",
  "currentRole",
  "company",
  "highestDegree",
  "expertise",
  "circle",
  "buildingNow",
  "whyZLabs",
  "contribution"
] as const;

type ApplicationPayload = {
  fullName?: string;
  email?: string;
  linkedin?: string;
  currentRole?: string;
  company?: string;
  highestDegree?: string;
  expertise?: string;
  circle?: string;
  buildingNow?: string;
  whyZLabs?: string;
  contribution?: string;
  referral?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function encodeTableName(tableName: string) {
  return tableName
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
}

export async function POST(request: Request) {
  let payload: ApplicationPayload;

  try {
    payload = (await request.json()) as ApplicationPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const data = {
    fullName: clean(payload.fullName),
    email: clean(payload.email).toLowerCase(),
    linkedin: clean(payload.linkedin),
    currentRole: clean(payload.currentRole),
    company: clean(payload.company),
    highestDegree: clean(payload.highestDegree),
    expertise: clean(payload.expertise),
    circle: clean(payload.circle),
    buildingNow: clean(payload.buildingNow),
    whyZLabs: clean(payload.whyZLabs),
    contribution: clean(payload.contribution),
    referral: clean(payload.referral)
  };

  const missingFields = requiredFields.filter((field) => !data[field]);

  if (missingFields.length > 0) {
    return NextResponse.json(
      { error: "Missing required fields.", fields: missingFields },
      { status: 400 }
    );
  }

  if (!isValidEmail(data.email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_APPLICATIONS_TABLE ?? "Applications";

  if (!apiKey || !baseId) {
    return NextResponse.json(
      { error: "Airtable application intake is not configured." },
      { status: 500 }
    );
  }

  const response = await fetch(
    `https://api.airtable.com/v0/${baseId}/${encodeTableName(tableName)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              "Full name": data.fullName,
              Email: data.email,
              "LinkedIn / website": data.linkedin,
              "Current role": data.currentRole,
              "Company / institution": data.company,
              "Highest degree": data.highestDegree,
              "Field of expertise": data.expertise,
              Circle: data.circle,
              "Building now": data.buildingNow,
              "Why Z Labs": data.whyZLabs,
              Contribution: data.contribution,
              "Referral source": data.referral,
              Status: "New",
              Source: "z-labs-application",
              "Submitted at": new Date().toISOString()
            }
          }
        ]
      })
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Application could not be saved." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
