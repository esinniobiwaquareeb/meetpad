"use client";

import { useEffect, useRef, useState } from "react";
import { meetingFacts } from "@/static_data/data";

export default function FactsText() {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null!);

  useEffect(() => {
    const handleFactChange = () => {
      ref.current.textContent = meetingFacts[index];
      setIndex((i) => (i === meetingFacts.length - 1 ? 0 : i + 1));
      ref.current.style.opacity = "1";
    };

    const id = setInterval(() => {
      handleFactChange();
    }, 5000);

    return () => clearInterval(id);
  }, [index]);

  return (
    <p
      ref={ref}
      className="text-sm opacity-5 transition-opacity duration-300"
    ></p>
  );
}
