"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

type Props = {
  options: string[];
  initialValue?: string;
  className?: string;
  selectionName?: string;
};

export default function CustomSelect({ options, initialValue, className, selectionName }: Props) {
  const [value, setValue] = useState(initialValue || options[0]);

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  return (
    <Select value={value} onValueChange={setValue} name={selectionName}>
      <SelectTrigger className={`w-full ${className}`}>
        <SelectValue>{value}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
