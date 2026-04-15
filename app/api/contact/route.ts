import { NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  company?: string;
  country?: string;
  industry?: string;
  service?: string;
  message: string;
  referral?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    if (!body.name?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: "Name and message are required." },
        { status: 400 }
      );
    }

    // TODO: Replace with your email backend endpoint.
    // Example using a transactional email service:
    //
    // await fetch("https://your-email-api.com/send", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${process.env.EMAIL_API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     to: "hello@susea.ai",
    //     subject: `New enquiry from ${body.name}`,
    //     html: `
    //       <p><strong>Name:</strong> ${body.name}</p>
    //       <p><strong>Company:</strong> ${body.company}</p>
    //       <p><strong>Country:</strong> ${body.country}</p>
    //       <p><strong>Industry:</strong> ${body.industry}</p>
    //       <p><strong>Service:</strong> ${body.service}</p>
    //       <p><strong>Message:</strong> ${body.message}</p>
    //       <p><strong>Referral:</strong> ${body.referral}</p>
    //     `,
    //   }),
    // });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
