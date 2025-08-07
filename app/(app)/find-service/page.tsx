import { Suspense } from "react";
import Search from "./search";
import ServiceList from "./ServiceList";
import ServiceLoader from "@/components/services/service-loader";
import ButtonLoaderMore from "./btn-load-more";

export const metadata = {
  title: "Find a Service",
};

export default async function Page({ searchParams }: PageParamProps) {
  const { search, results } = searchParams;

  return (
    <div>
      <Search />
      <Suspense fallback={<ServiceLoader />}>
        <ServiceList query={search as string} results={results as string} />
      </Suspense>
      <div className="flex justify-center my-8">
        <ButtonLoaderMore />
      </div>
    </div>
  );
}
