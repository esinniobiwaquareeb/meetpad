import { getAllServices } from "@/server/service.actions";
import Service from "./Service";
import ButtonLoaderMore from "./btn-load-more";
import { unstable_noStore } from "next/cache";

export default async function ServiceList({
  query,
  results,
}: {
  query: string;
  results: string;
}) {
  const services = await getAllServices(query, { from: 0, to: +results });
  unstable_noStore();
  const colors = ["orange", "violet", "blue", "purple", "red"];
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-10">
        {services.map((service, i) => (
          <Service key={service.id} service={service} color={colors[i]} />
        ))}
      </div>
    </div>
  );
}
