import PageLoader from "@/components/common/page-loader";

export default function Loading() {
  return (
    <div className="h-screen">
      <div className="w-fit mx-auto mt-32">
        <PageLoader />
      </div>
    </div>
  );
}
