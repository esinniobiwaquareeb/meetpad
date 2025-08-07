"use client";

import { useState, useEffect } from "react";
import { Info, MoveRight, X } from "lucide-react";
import { Heading } from "../ui/Heading";
import { P } from "../ui/typography";
import { Button } from "../ui/button";
import { getCurrentUser } from "@/server/user.actions";

const StripeBanner: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      setCurrentUser(user);
    }

    fetchUser();
  }, []);

  const handleStripeVerification = async () => {
    setLoading(true);
    try {
      if (!currentUser) {
        alert("User is not logged in");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/stripe/create-verification-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUser.id }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create verification session");
      }
    } catch (error) {
      alert("Error: " + (error as Error).message);
    }
    setLoading(false);
  };

  if (isDismissed) return null;

  return (
    <div className="bg-gray-50 rounded-md grid grid-cols-[auto_1fr] p-4 gap-2 mb-6 overflow-hidden relative before:content-[''] before:block before:w-[4px] before:bg-primary before:absolute before:left-0 before:top-0 before:h-full">
      <div>
        <Info className="fill-primary stroke-gray-50" />
      </div>
      <div>
        <Heading type="h5" className="text-primary">
          Verify your account
        </Heading>
        <P size="sm" className="mb-3 leading-[1.4] md:max-w-[80ch]">
          To charge your customers you need to verify your identity and provide
          payment details.
        </P>
        <Button
          variant="outline"
          onClick={handleStripeVerification}
          disabled={loading}
        >
          {loading ? "Loading..." : "Verify your account"}
          <MoveRight className="text-gray-700" size={16} />
        </Button>
      </div>
      <Button
        onClick={() => setIsDismissed(true)}
        size="xs"
        variant="ghost"
        className="absolute top-2 right-2"
      >
        <X size={20} />
      </Button>
    </div>
  );
};

export default StripeBanner;
