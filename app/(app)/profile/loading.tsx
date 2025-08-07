import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-6">
      <h2 className="text-[24px] font-semibold mb-4">My Profile</h2>

      <div className="flex items-center space-x-4">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-[80px]" />
          <Skeleton className="h-5 w-[200px]" />
        </div>
      </div>
      <div className="my-8 space-y-2">
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-[75%] h-5" />
      </div>
      <div className="grid grid-cols-[1fr_.2fr_.2fr] gap-6 mb-10">
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
      </div>

      <div className="grid gap-4 w-full md:w-[75%]">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-8" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-8" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-8" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-8" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-8" />
        </div>
      </div>
    </div>
  );
}
