"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { ReactNode, useState } from "react";
import { CirclePlus } from "lucide-react";
import FormEditMeeting from "./form-edit-meeting";

type Props = {
  children?: ReactNode;
  className?: string;
  meeting: Meeting;
};

export default function ButtonEditMeeting({
  children,
  className,
  meeting,
}: Props) {
  const [open, setOpen] = useState(false);

  const closeSheet = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children ? (
          <Button variant="ghost" size="sm" className={className} aria-modal>
            {children}
          </Button>
        ) : (
          <Button size="sm">
            <CirclePlus size={18} />
            Create Meeting
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="min-w-full sm:min-w-[580px] bg-gray-50">
        <SheetHeader className="mb-6 bg-blue-50 dark:bg-muted p-3 rounded-md overflow-hidden w-[95%] relative before:content-[''] before:block before:w-[4px] before:bg-primary before:absolute before:left-0 before:top-0 before:h-full">
          <SheetTitle className="text-lg">Edit Meeting Schedule</SheetTitle>
          <SheetDescription>
            Get starting by filling the information below to schedule a meeting.
            Your client will be notified via email
          </SheetDescription>
        </SheetHeader>
        <FormEditMeeting closeForm={closeSheet} meeting={meeting} />
      </SheetContent>
    </Sheet>
  );
}
