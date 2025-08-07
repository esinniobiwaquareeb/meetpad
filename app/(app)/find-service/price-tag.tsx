"use client";

import { formatCurrencyToUSD } from "@/lib/utils";

export default function PriceTag({ price }: { price: number }) {
  const styles = price
    ? "bg-green-50 text-green-800 dark:bg-green-800 dark:text-green-100"
    : "bg-amber-100 text-amber-950 dark:bg-amber-950 dark:text-amber-200";
  return (
    <span
      className={`px-2 py-1 text-sm rounded absolute top-1 right-1 ${styles}`}
    >
      {price ? formatCurrencyToUSD(String(price)) : "Free"}
    </span>
  );
}
