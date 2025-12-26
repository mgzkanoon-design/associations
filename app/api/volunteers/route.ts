import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      full_name,
      email,
      phone,
      country,
      city,
      languages,
      skills,
      availability,
      motivation,
      consent,
    } = body ?? {};

    if (!full_name || !email || consent !== true) {
      return NextResponse.json(
        { error: "Missing required fields or consent not given" },
        { status: 400 }
      );
    }

    const { error } = await supabaseServer.from("volunteers").insert([
      {
        full_name,
        email,
        phone: phone ?? null,
        country: country ?? null,
        city: city ?? null,
        languages: Array.isArray(languages) ? languages : null,
        skills: Array.isArray(skills) ? skills : null,
        availability: availability ?? null,
        motivation: motivation ?? null,
        consent: true,
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
