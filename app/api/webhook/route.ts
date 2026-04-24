import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.text();

    console.log("Stripe webhook received:", body);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);

    return NextResponse.json(
      { error: "Webhook failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Stripe webhook endpoint is active. Use POST only." },
    { status: 405 }
  );
}