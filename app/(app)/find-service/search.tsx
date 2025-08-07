"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = () => {
    if (!search) return;
    const params = new URLSearchParams(searchParams);
    router.replace(pathname.split("?")[0], { scroll: false });
    params.set("search", search);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center md:w-96 gap-6 justify-end mb-10">
      <Input
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <Button disabled={search.length < 3} onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
}
