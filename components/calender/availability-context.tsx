"use client";

import { transformAvailability } from "@/schemas/availability.schema";
import { ReactNode, useContext, createContext } from "react";

interface ContextI {
  serviceId: string;
  availaibility: AvailabilityObj;
}

const AvailabilityContext = createContext({} as ContextI);

type Props = {
  serviceId: string;
  availaibility: Availability;
  children: ReactNode;
};

function AvailabilityProvider({ serviceId, availaibility, children }: Props) {
  return (
    <AvailabilityContext.Provider
      value={{ serviceId, availaibility: transformAvailability(availaibility) }}
    >
      {children}
    </AvailabilityContext.Provider>
  );
}

function useAvailability() {
  const context = useContext(AvailabilityContext);

  if (!context)
    throw new Error(
      "AvailabilityContext is used outside AvailabilityProvider!"
    );

  return context;
}

export { AvailabilityProvider, useAvailability };
