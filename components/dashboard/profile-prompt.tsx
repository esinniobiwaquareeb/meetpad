"use client";
import { MoveRight } from "lucide-react";
import { P } from "../ui/typography";
import Chart from "./chart";
import Link from "next/link";

export default function ProfilePrompt() {
  return (
    <Link
      href="/profile"
      className="bg-blue-50 dark:bg-muted px-3 rounded-md grid grid-cols-[1fr_auto] items-center"
    >
      <div>
        <div className="flex items-center gap-6 mb-2">
          <P className="text-gray-900 font-semibold">Complete your Profile</P>
          <MoveRight />
        </div>
        <P size="sm">
          Finish your profile to access all the features on MeetPad
        </P>
      </div>
      <div>
        <Chart />
      </div>
    </Link>
  );
}
