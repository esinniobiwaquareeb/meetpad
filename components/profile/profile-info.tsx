"use client";
import { useState } from "react";
import { P } from "../ui/typography";
import { TiInfoOutline } from "react-icons/ti";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export default function ProfileInfo() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="bg-blue-50 md:w-[80%] border border-primary rounded-md grid grid-cols-[auto_1fr] p-4 gap-2 mb-6 overflow-hidden relative before:content-[''] before:block before:w-[3px] before:bg-primary before:absolute before:left-0 before:top-0 before:h-full dark:bg-muted">
      <div>
        <TiInfoOutline className="fill-primary" size={24} />
      </div>
      <P size="sm" className="font-normal w-[96%]">
        Fill in the fields below to share your profile publicly via a link on
        your social media or website. You can preview your profile by clicking
        the {"View Public Profile button"}. Remember to click the Save button
        after filling in the fields or changing the data.
      </P>
      <Button
        onClick={() => setIsDismissed(true)}
        size="xs"
        variant="ghost"
        className="absolute top-2 right-0"
      >
        <X size={20} />
      </Button>
    </div>
  );
}
