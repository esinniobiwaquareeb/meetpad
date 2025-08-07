import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    // Create a verification session
    const session = await stripe.identity.verificationSessions.create({
      type: 'document',
      metadata: {
        user_id: userId,
      },
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/callback?method=POST`,
      // return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
    });

    console.log(session);
    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
