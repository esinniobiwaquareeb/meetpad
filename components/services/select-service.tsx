"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type Props = {
  options: { value: string; id: string }[];
  className?: string;
};

export default function SelectService({ options, className }: Props) {
  const [value, setValue] = useState(options[0].value);
  const serviceId = options.find((option) => option.value === value)?.id;

  return (
    <Select onValueChange={(val: string) => setValue(val)}>
      <SelectTrigger className={`w-full ${className}`}>
        <SelectValue placeholder={value}></SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.id} value={option.value}>
            {option.value}
          </SelectItem>
        ))}
      </SelectContent>
      {/* get value of the children */}
      <input
        defaultValue={serviceId}
        hidden
        value={serviceId}
        name="id"
        type="text"
      />
    </Select>
  );
}
