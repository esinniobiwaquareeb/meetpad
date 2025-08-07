import { Skeleton } from "../ui/skeleton";

export default function AvailabilityLoader() {
  return (
    <div className="p-2 md:p-6">
      <div className="grid gap-12">
        {Array.from({ length: 2 }, (_, i) => i).map((i) => (
          <div key={i} className="border rounded-md p-3">
            <div className="mb-8">
              <Skeleton className="w-[250px] h-8" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Array.from({ length: 7 }, (_, i) => i).map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="w-[50%] h-6" />
                  <div className="space-y-2">
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-full h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
