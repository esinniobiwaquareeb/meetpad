"use client";

import ButtonCopy from "@/components/common/button-copy";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/Heading";
import { P } from "@/components/ui/typography";
import { Radio, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PriceTag from "./price-tag";

interface ServiceWithUser extends Service {
  user: User;
}

type Props = {
  service: ServiceWithUser;
  color?: string;
};

export default function Service({ service, color }: Props) {
  const username = service?.user?.username ?? "";
  const { id, title, description, duration, user, price, image_url } = service;

  const serviceUrl =
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000/u/${username}?service=${id}`
      : `https://meetpad.app/u/${username}?service=${id}`;

  return (
    <div
      className={`p-3 pt-6 bg-gray-50 border border-gray-200 rounded md:rounded relative overflow-hidden shadow cursor-pointer`}
    >
      <div
        style={{ backgroundColor: color || "green" }}
        className="absolute w-full h-0.5 top-0 left-0"
      ></div>
      <div className="h-32 relative mb-2">
        <Image src={image_url} alt="service image" fill className="h-32 w-32" />
      </div>
      <div className="flex items-center gap-2">
        <div className="relative h-8 aspect-square mb-3">
          <Image
            src={user.image_url}
            fill
            alt={user.firstName}
            className="rounded-full absolute"
          />
        </div>
        <Heading type="h5" className="m-0 p-0">
          {title}
        </Heading>
      </div>
      <div className="mb-3">
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-gray-800">
            <span className="h-6 bg-blue-50 dark:bg-muted text-primary aspect-square rounded-md flex items-center justify-center">
              <Timer className="size-5" />
            </span>
            <P size="sm">{duration} minutes</P>
          </div>

          {/* <MeetingTypesList meeting_types={meeting_types} /> */}
          <div className="flex items-center gap-2 text-gray-800">
            <span className="h-6 bg-blue-50 dark:bg-muted text-primary aspect-square rounded-md flex items-center justify-center">
              <Radio className="size-5" />
            </span>
            <P size="sm" className="capitalize">
              Live Meeting
            </P>
          </div>
        </div>
        <PriceTag price={price} />
      </div>
      <P size="sm" className="font-normal min-h-[80px]">
        {description}
      </P>
      <div className="border-t mt-4">
        <div className="flex items-center justify-between mt-4 gap-6">
          <ButtonCopy size="sm" className="font-normal" textToCopy={serviceUrl}>
            Copy link
          </ButtonCopy>
          <Button asChild>
            <Link href={serviceUrl}>Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
