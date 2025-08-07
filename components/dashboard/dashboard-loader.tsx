import TableLoader from "../common/table-loader";
import { Skeleton } from "../ui/skeleton";

export default function DashboardLoader() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Skeleton className="h-6" />
        <Skeleton className="h-6 w-3/4" />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
      <div className="grid grid-cols-[.7fr_.3fr] gap-6 h-48">
        <Skeleton />
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 30 }, (_, i) => i).map((i) => (
            <Skeleton className="w-8 aspect-square" key={i} />
          ))}
        </div>
      </div>
      <TableLoader />
    </div>
  );
}
