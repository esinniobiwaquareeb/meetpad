"use client";
import ButtonCopy from "@/components/common/button-copy";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/input";
import { P } from "@/components/ui/typography";
import { useCurrentUser } from "@/contexts/user-context";
import Link from "next/link";
import { RiExternalLinkLine } from "react-icons/ri";

export default function SectionPublicProfile() {
  const { username } = useCurrentUser();
  const currentUrl =
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000/u/${username}`
      : `https://meetpad.app/u/${username}`;
  return (
    <div>
      <Heading type="h5">Public URL</Heading>
      <div className="grid gap-4 md:grid-cols-[1fr_auto] mb-10">
        <div className="grid grid-cols-[1fr_auto] border rounded-md">
          <Input disabled type="text" value={`${currentUrl}`} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ButtonCopy textToCopy={`${currentUrl}`}>Copy Link</ButtonCopy>
          <Link
            className="inline-flex items-center gap-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-2 rounded py-2 justify-center md:py-0 md:justify-start"
            href={`/u/${username}`}
            target="_blank"
          >
            <RiExternalLinkLine />
            <P size="sm">View public profile</P>
          </Link>
        </div>
      </div>
    </div>
  );
}
