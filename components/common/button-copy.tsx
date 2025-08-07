"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { ReactNode } from "react";
import { GoCopy } from "react-icons/go";

type Props = {
  textToCopy?: string;
  children?: ReactNode;
  className?: string;
  size?: "default" | "sm" | "xs" | "lg" | "icon" | null | undefined;
};

export default function ButtonCopy({
  textToCopy = "",
  children,
  className,
  size,
}: Props) {
  return (
    <Button
      variant="outline"
      type="button"
      size={size}
      className={className}
      onClick={() => {
        navigator.clipboard.writeText(textToCopy);
        toast.success("Copied to clipboard!");
      }}
    >
      <GoCopy />
      {children}
    </Button>
  );
}
