"use client";
import ServicePreview from "./service-preview";
import ServiceSelect from "./service-select";
import ExpertPhoto from "./expert-photo";
import { ExpertDetails } from "./expert-details";

export default function ServiceScreen() {
  return (
    <div className="grid md:grid-cols-[auto_1fr] gap-6">
      <div className="flex justify-center">
        <ExpertPhoto />
      </div>
      <div className="grid gap-6">
        <ExpertDetails />
        <ServiceSelect />
        <ServicePreview />
      </div>
    </div>
  );
}
