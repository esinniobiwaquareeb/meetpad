// components/verify-email-client.tsx
"use client";

import { Heading } from "@/components/ui/Heading";
import { useSearchParams } from "next/navigation";

const VerifyEmailClient: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <Heading type="h6" className="my-4">
      {email}
    </Heading>
  );
};

export default VerifyEmailClient;
