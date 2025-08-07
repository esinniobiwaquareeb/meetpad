import PageLoader from "../common/page-loader";

export default function BookingLoader() {
  return (
    <div className="min-h-screen bg-[rgba(0_,0,_0,_0.05)] absolute inset-0 z-10 ">
      {/* <div className="bg-gray-50 min-h-[20rem] w-1/2"> */}
      <div className="absolute top-[45%] left-1/2 p-3 z-20 [&_*]:z-30 -translate-x-1/2">
        <PageLoader />
        {/* </div> */}
      </div>
    </div>
  );
}
