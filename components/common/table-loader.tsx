import { Skeleton } from "../ui/skeleton";

type Props = {
  rows?: number;
  columns?: number;
};

export default function TableLoader({ columns = 5, rows = 4 }: Props) {
  const dataRows = Array.from({ length: rows }, (_, i) => i);
  const dataCols = Array.from({ length: columns }, (_, i) => i);
  return (
    <div className="grid gap-3 border bg-gray-50 p-3 rounded">
      <div className="grid grid-cols-5 gap-1 rounded-none">
        <Skeleton className="h-12"></Skeleton>
        <Skeleton className="h-12"></Skeleton>
        <Skeleton className="h-12"></Skeleton>
        <Skeleton className="h-12"></Skeleton>
        <Skeleton className="h-12"></Skeleton>
      </div>
      <Skeleton className="h-10"></Skeleton>
      <Skeleton className="h-10"></Skeleton>
      <Skeleton className="h-10"></Skeleton>
    </div>
  );
}
