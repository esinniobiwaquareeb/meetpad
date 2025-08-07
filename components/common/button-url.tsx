"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ReactNode } from "react";

type Props = {
  url?: string;
  children?: ReactNode;
};

export default function ButtonURL({ children, url }: Props) {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        if (!url) return;
        router.push(url);
      }}
      variant="outline"
      type="button"
    >
      {children}
    </Button>
  );
}
