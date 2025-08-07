"use client";

import Service from "./service";
import { useServices } from "./services-context";

export default function ServiceCards() {
  const { services } = useServices();
  const colors = ["orange", "violet", "blue", "purple", "red"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {services.map((service, i) => (
        <Service serviceId={service.id} key={service.id} color={colors[i]} />
      ))}
    </div>
  );
}
