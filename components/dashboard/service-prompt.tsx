"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { P } from "../ui/typography";

export default function ServicePrompt() {
  const router = useRouter();
  return (
    <div className="bg-red-50 dark:bg-orange-950 p-3 rounded-md">
      <div className="mb-4">
        <P className="text-gray-900 font-semibold">Services</P>
        <P size="sm">Click the button below to add your services</P>
      </div>
      <Button
        onClick={() => router.push("/services")}
        size="sm"
        className="bg-orange-800 dark:bg-orange-700 hover:bg-orange-900"
      >
        Add Services
      </Button>
    </div>
  );
}
