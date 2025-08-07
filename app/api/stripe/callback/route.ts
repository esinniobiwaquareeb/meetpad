import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    console.error("Signature is missing");
    return new Response("Signature missing", { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    if (event.type === "identity.verification_session.verified") {
      const session = event.data.object as Stripe.Identity.VerificationSession;
      const userId = session.metadata.user_id;

      const supabase = createClient();
      const { error } = await supabase
        .from("users")
        .update({ stripe_verified: true })
        .eq("id", userId);

      if (error) {
        console.error("Error updating user verification status:", error.message);
        return new Response("Database update failed", { status: 500 });
      }

      console.log(`User verification updated successfully for user: ${userId}`);
    } else {
      console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`);
  } catch (err) {
    console.error("Webhook signature verification failed:", (err as Error).message);
    return new Response(`Webhook error: ${(err as Error).message}`, { status: 400 });
  }
}
