"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ButtonLoaderMore() {
  const [isLoading, setIsLoading] = useState(false);
  const [range, setRange] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleRange = () => {
    setRange((range) => range + 1);
    const params = new URLSearchParams(searchParams);
    params.set("results", `${range * 10}`);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Button
      onClick={() => handleRange()}
      variant="secondary"
      size="lg"
      className="rounded-2xl flex items-center gap-3 bg-gray-50"
    >
      {isLoading && <LoaderCircle className="animate-spin" size={18} />}
      {isLoading ? "Loading" : "Load more"}
    </Button>
  );
}
