// import { auth } from "@/lib/auth";
import { getCurrentHour, getTodaysDate } from "@/lib/utils";
import Image from "next/image";

import expert from "@/public/expert.png";
import { Heading } from "../ui/Heading";
import { P } from "../ui/typography";
import FactsText from "./facts-text";

export function WelcomeScreen({ email }: { email: string }) {
  // const session = await auth();

  return (
    <div className="bg-gray-50 p-4 rounded-md md:grid md:grid-cols-[1fr_0.8fr] md:items-center gap-2 md:gap-1">
      <div>
        <Heading>
          👋 {getCurrentHour()}{" "}
          {email.split("@")[0].replace(email[0], email[0].toUpperCase())}
          {/* {getCurrentHour()}, {session?.user?.name?.split(" ")[0]}👋 */}
        </Heading>
        <P size="sm" className="mt-10">
          It&apos;s <strong className="text-primary">{getTodaysDate()}</strong>{" "}
          today.
        </P>
        <div className="max-w-md space-y-1">
          <FactsText />
        </div>
      </div>
      <div className="relative">
        <Image src={expert} alt="expert illustration" className="dark:hidden" />
      </div>
    </div>
  );
}
