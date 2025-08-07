import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import {
  createUserSubscription,
  deleteUserSubscription,
  getUserByEmail,
  getUserSubscription,
  updateUser,
  upgradeUserSubscription,
} from "@/server/user.actions";
import { redirect } from "next/navigation";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = await stripe.checkout.sessions.retrieve(
          (event.data.object as Stripe.Checkout.Session).id,
          {
            expand: ["line_items"],
          }
        );
        const stripe_customer_id = session.customer as string;
        const stripe_customer_details = session.customer_details;
        console.log(stripe_customer_details);

        if (stripe_customer_details?.email) {
          const user = await getUserByEmail(stripe_customer_details.email);

          if (!user.stripe_customer_id)
            await updateUser(user.id, { stripe_customer_id });

          const lineItems = session.line_items?.data || [];

          for (const item of lineItems) {
            const priceId = item.price?.id;
            const isSubscription = item.price?.type === "recurring";

            let plan = undefined;
            let period = null;

            if (isSubscription) {
              let endDate = new Date();
              if (priceId === process.env.STRIPE_BASIC_PLAN_PRICE_ID!) {
                plan = "basic";
                period = "monthly"; // can be changed later
                endDate.setMonth(endDate.getMonth() + 1); // 1 month from now
              } else if (
                priceId === process.env.STRIPE_STANDARD_PLAN_PRICE_ID!
              ) {
                plan = "standard";
                period = "monthly"; // can be changed later
                endDate.setMonth(endDate.getMonth() + 1); // 1 month from now
              } else if (
                priceId === process.env.STRIPE_PREMIUM_PLAN_PRICE_ID!
              ) {
                plan = "premium";
                period = "monthly"; // can be changed later
                endDate.setMonth(endDate.getMonth() + 1); // 1 month from now
              } else {
                throw new Error("Invalid priceId");
              }

              const subscription = await getUserSubscription(user.id);

              const payload = {
                startDate: new Date(), // from now on
                endDate,
                plan,
                period,
              };

              if (subscription) await upgradeUserSubscription(user.id, payload);
              else await createUserSubscription(user.id, payload);

              await updateUser(user.id, { plan: payload.plan });

              const redirectUrl =
                process.env.NODE_ENV === "production"
                  ? "http://meetpad.app/plan"
                  : "http://localhost:3000/plan";

              await stripe.checkout.sessions.create({
                success_url: redirectUrl,
              });

              return redirect("/plan");
            } else {
              // one_time_purchase
            }
          }
        }
        break;
      case "customer.subscription.deleted": {
        const subscription = await stripe.subscriptions.retrieve(
          (event.data.object as Stripe.Subscription).id
        );
        await deleteUserSubscription(subscription.customer as string);
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error("Error handling event", error);
    return new Response("Webhook Error", { status: 400 });
  }

  return new Response("Webhook received", { status: 200 });
}
