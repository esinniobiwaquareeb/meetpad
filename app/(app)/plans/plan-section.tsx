"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCurrentUser } from "@/contexts/user-context";
import clsx from "clsx";

import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const plans = [
  {
    name: "free",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    features: ["Chat", "Voice Call", "Video Call", "3 meetings Monthly"],
    paymentLink: "",
  },
  {
    name: "basic",
    monthlyPrice: "$20",
    yearlyPrice: "$200",
    features: ["Chat", "Voice Call", "Video Call", "10 meetings Monthly"],
    // paymentLink: process.env.STRIPE_BASIC_PLAN_SUBSCRIPTION_LINK!,
    paymentLink: "https://buy.stripe.com/test_eVa16P3qyfuYanS8wy",
  },
  {
    name: "standard",
    monthlyPrice: "$50",
    yearlyPrice: "$500",
    features: ["Chat", "Voice Call", "Video Call", "20 meetings Monthly"],
    // paymentLink: process.env.STRIPE_BASIC_PLAN_SUBSCRIPTION_LINK!,
    paymentLink: "https://buy.stripe.com/test_eVa4j1e5c0A4brWaEE",
  },
  {
    name: "premium",
    monthlyPrice: "$100",
    yearlyPrice: "$1000",
    features: ["Chat", "Voice Call", "Video Call", "Unlimited meetings"],
    // paymentLink: process.env.STRIPE_PREMIUM_PLAN_SUBSCRIPTION_LINK!,
    paymentLink: "https://buy.stripe.com/test_bIY8zhaT03Mg7bGaEF",
  },
];

export default function PlanSection() {
  const user = useCurrentUser();
  const currentUserPlan = user.plan;
  const router = useRouter();
  const planOrder = ["free", "basic", "standard", "premium"];
  return (
    <div className="my-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:items-center">
      {plans.map((plan, i) => {
        const { name, monthlyPrice, yearlyPrice, paymentLink, features } = plan;
        return (
          <Card
            key={i}
            className={clsx({ "border-primary": name === currentUserPlan })}
          >
            <CardHeader className="text-center pb-2">
              {name === currentUserPlan && (
                <Badge className="uppercase w-max self-center mb-3">
                  Current plan
                </Badge>
              )}
              <CardTitle className="mb-2 text-xl capitalize">{name}</CardTitle>
              <div className="flex items-center gap-1 justify-center">
                <p className="font-bold text-3xl">{monthlyPrice} </p>
                <span className="text-sm font-normal text-muted-foreground">
                  /monthly
                </span>
              </div>
            </CardHeader>

            <CardContent>
              <ul className="mt-7 space-y-2.5 text-sm">
                {features.map((feature, i) => (
                  <li key={i} className="flex space-x-2">
                    <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4 stroke-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => router.push(paymentLink)}
                className="w-full"
                disabled={i == planOrder.indexOf(currentUserPlan)}
              >
                {i < planOrder.indexOf(currentUserPlan) && "Downgrade"}
                {i === planOrder.indexOf(currentUserPlan) && "Current plan"}
                {i > planOrder.indexOf(currentUserPlan) && "Upgrade"}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
