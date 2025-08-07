import { Skeleton } from "../ui/skeleton";

export default function ServiceLoader() {
  return (
    <div className="bg-gray-50 p-3">
      <div className="grid md:grid-cols-3 gap-6">
        {Array.from({ length: 4 }, (_, i) => i).map((i) => (
          <div key={i} className="px-3 py-6 rounded border">
            <div className="space-y-4 mb-8">
              <Skeleton className="w-[65%] h-7" />
              <Skeleton className="W-[90%] h-5" />
            </div>
            <div className="space-y-2">
              <Skeleton className="w-full h-3" />
              <Skeleton className="w-[75%] h-3" />
              <Skeleton className="w-[25%] h-3" />

              <div className="h-14"></div>
              <div className="flex justify-between">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
