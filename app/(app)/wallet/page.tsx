import { Suspense } from "react";
import Cards from "./cards";
import TableLoader from "@/components/common/table-loader";
import CardsLoader from "./cards-loader";
import { EarningsTableProvider, WalletHistoryTableProvider } from "./providers";

export const metadata = {
  title: "Wallet History",
};

export default function Page() {
  return (
    <div>
      <div className="space-y-3 mb-12">
        <h1 className="text-2xl font-bold">Wallet History</h1>
        <Suspense fallback={<CardsLoader />}>
          <Cards />
        </Suspense>
      </div>
      <div className="space-y-8">
        <Suspense fallback={<TableLoader />}>
          <EarningsTableProvider />
        </Suspense>
        <Suspense fallback={<TableLoader />}>
          <WalletHistoryTableProvider />
        </Suspense>
      </div>
    </div>
  );
}
