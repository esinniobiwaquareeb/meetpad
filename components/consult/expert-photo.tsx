import { BadgeCheck } from "lucide-react";
import { Heading } from "../ui/Heading";
import Image from "next/image";
import { useBookingState } from "./booking-context";

export default function ExpertPhoto() {
  const { user } = useBookingState();
  return (
    <div className="relative bg-gray-75 flex items-center justify-center h-[6rem] aspect-square rounded border">
      {user.image_url ? (
        <Image
          src={user.image_url}
          alt="user image"
          width={100}
          height={100}
          layout="responsive"
        />
      ) : (
        <Heading type="h2" className="uppercase">
          {/* {user.firstName[0]}
          {user.lastName[0]} */}
        </Heading>
      )}
      <BadgeCheck className="absolute top-0 right-0 text-gray-50 fill-green-500 translate-x-[50%] -translate-y-[50%]" />
    </div>
  );
}
