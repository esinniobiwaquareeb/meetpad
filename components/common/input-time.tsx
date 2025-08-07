"use client";

import { useState } from "react";
import { Input } from "../ui/input";

type Props = {
  name?: string;
  min?: string;
  max?: string;
};

export default function InputTime({ name, min, max }: Props) {
  const [time, setTime] = useState("");

  return (
    <Input
      type="time"
      name={name}
      className="focus:border-primary focus:ring-primary block w-full rounded-md border-gray-300 text-sm"
      value={time}
      onChange={(event) => setTime(event.target.value)}
    />
  );
}
