"use client";

import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FormAvailability from "@/components/calender/form-availability";
import { CalendarClock } from "lucide-react";

type Props = {
  children?: ReactNode;
  text?: string;
  showIcon?: boolean;
  className?: string;
  size?: "default" | "sm";
  variant?: "default" | "ghost" | "outline" | "link" | "secondary";
};

export default function ButtonSetAvailability({
  children,
  text = "Edit availability",
  showIcon = true,
  className,
  size = "default",
  variant = "default",
}: Props) {
  const [open, setOpen] = useState(false);
  const closeSheet = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {
          <Button size={size} className={className} variant={variant}>
            {showIcon && <CalendarClock size={18} />}
            {text}
          </Button>
        }
      </SheetTrigger>
      <SheetContent className="min-w-full sm:min-w-[580px] p-3">
        <SheetHeader className="">
          <SheetTitle className="text-lg">Weekly hours</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <FormAvailability closeForm={closeSheet} />
      </SheetContent>
    </Sheet>
  );
}
