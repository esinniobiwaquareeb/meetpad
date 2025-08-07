"use client";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { P } from "@/components/ui/typography";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] =

  const sendResetLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const supabase = createClient();
    if (!email) return;
    const response = await supabase.auth.resetPasswordForEmail(email);

    setIsLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-20">
      <form onSubmit={sendResetLink}>
        <div className="w-[90%] max-w-[500px] mx-auto bg-gray-50 p-6 shadow-sm rounded-md">
          <Heading className="mb-3">Reset your password</Heading>
          <P size="sm">To 🚀 Get Back on Track in No Time</P>

          <div className="mt-6">
            <Label>Email address</Label>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="grid my-6">
            <Button type="submit">
              {isLoading ? "Sending..." : "Send reset link"}
            </Button>
          </div>
          <P size="sm" className="flex items-center gap-2">
            Need help?{" "}
            <Link href="/confirm" className="text-primary">
              Contact customer support
            </Link>
          </P>
        </div>
      </form>
    </div>
  );
}
