"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { useBookingState } from "./booking-context";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ServiceSelect() {
  const { user, selectedService, dispatch } = useBookingState();

  return (
    <div>
      <Label>Please select a service</Label>
      <Select
        onValueChange={(value) =>
          dispatch({ type: "set/service", payload: value })
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={selectedService.title}></SelectValue>
        </SelectTrigger>
        <SelectContent>
          {user?.services?.length ? (
            user.services.map((service) => (
              <SelectItem key={service.id} value={service.title}>
                {service.title}
              </SelectItem>
            ))
          ) : (
            <SelectItem disabled value={""}>No services available</SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
