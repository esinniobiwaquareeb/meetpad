"use client";

import { MobileProvider, useMobile } from "@/hooks/useMobileNav";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";

export default function NavToggle() {
  return (
    <MobileProvider>
      <ButtonToggle />;
    </MobileProvider>
  );
}

function ButtonToggle() {
  const { isNavOpen, toggleNav } = useMobile();
  return (
    <Button
      onClick={toggleNav}
      variant="ghost"
      className="z-10 md:static fixed top-4"
    >
      {isNavOpen ? <X /> : <Menu />}
    </Button>
  );
}
