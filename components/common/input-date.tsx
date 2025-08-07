"use client";

import { useState } from "react";
import { Input } from "../ui/input";

type Props = {
  name?: string;
  min?: string;
  max?: string;
  showDefaultValue?: boolean;
  defaultValue?: string;
};

export default function InputDate({
  name,
  min,
  showDefaultValue = true,
  defaultValue,
}: Props) {
  const [date, setDate] = useState(showDefaultValue ? defaultValue : "");

  return (
    <Input
      type="date"
      className="focus:border-primary focus:ring-primary block h-[42px] w-full rounded-md border-gray-300 leading-none uppercase text-sm"
      min={min}
      value={date}
      onChange={(event) => setDate(event.target.value)}
      name={name}
    />
  );
}
